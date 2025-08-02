import pulp
import pandas as pd
import random
from dynamodb_utils import fetch_bands_from_dynamodb
from models import Band

def get_member_bands(bands):
    member_bands = {}
    for band in bands:
        for member in band.members:
            member_bands.setdefault(member, []).append(band.name)
    return member_bands

def get_band_members(bands):
    band_members = {}
    for band in bands:
        band_members[band.name] = band.members
    return band_members

def get_e(studio_num, period_num):
    return [[1 for _ in range(period_num)] for _ in range(studio_num)]

def get_g(period_num, bands):
    g = [[0 for _ in range(period_num)] for _ in range(len(bands))]
    for i, band in enumerate(bands):
        g[i][band.start_time:band.end_time + 1] = [1] * (band.end_time - band.start_time + 1)
    return g


def schedule(studio_num, period_num, rehearsal_num):
    bands = fetch_bands_from_dynamodb()
    band_names = [b.name for b in bands]
    periods = list(range(period_num))
    studios = list(range(studio_num))
    members = list({m for b in bands for m in b.members})
    member_bands = get_member_bands(bands)
    e = get_e(studio_num, period_num)
    g = get_g(period_num, bands)

    problem = pulp.LpProblem("BandScheduling", pulp.LpMaximize)

    x = {}
    for b in band_names:
        for p in periods:
            for s in studios:
                x[b, p, s] = pulp.LpVariable(f"x({b}, {p}, {s})", 0, 1, pulp.LpInteger)

    min_rehearsals = pulp.LpVariable("min_rehearsals", lowBound=0, cat=pulp.LpInteger)
    problem += min_rehearsals

    for m in members:
        for p in periods:
            problem += pulp.lpSum(x[b, p, s] for b in member_bands[m] for s in studios) <= 1

    for i, b in enumerate(band_names):
        for p in periods:
            for s in studios:
                problem += x[b, p, s] <= g[i][p]

    for p in periods:
        for s in studios:
            problem += pulp.lpSum(x[b, p, s] for b in band_names) <= e[s][p]

    for b in band_names:
        problem += pulp.lpSum(x[b, p, s] for p in periods for s in studios) >= rehearsal_num
        problem += pulp.lpSum(x[b, p, s] for p in periods for s in studios) <= rehearsal_num + 2

    problem += pulp.lpSum(x[b, p, s] for b in band_names for p in periods for s in studios)

    for key in x:
        x[key].setInitialValue(random.choice([0, 1]))
    solver = pulp.PULP_CBC_CMD(msg=True, timeLimit=180)
    problem.solve(solver)

    if problem.status != pulp.LpStatusOptimal:
        return None

    result = set()
    band_rehearsal_counts = {band_name: 0 for band_name in band_names}
    for b in band_names:
        for p in periods:
            for s in studios:
                if pulp.value(x[b, p, s]) == 1:
                    result.add((b, p, s))
                    band_rehearsal_counts[b] += 1

    return result
