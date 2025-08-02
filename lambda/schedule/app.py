from scheduler import schedule

def main():
    result = schedule(studio_num=14, period_num=20, rehearsal_num=1, table_name="bands")
    if result == None:
        print("can't find answer")
        return


if __name__ == "__main__":
    main()
