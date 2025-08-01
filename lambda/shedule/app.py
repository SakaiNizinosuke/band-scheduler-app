from scheduler import schedule

def main():
    result = schedule(studio_num=14, period_num=20, rehearsal_num=4, table_name="bands")
    for element in result:
        print(f"band: {result[0]}, studio: {result[1]}, period: {result[2]}")

if __name__ == "__main__":
    main()