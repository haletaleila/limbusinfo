def safe_input(prompt, input_type=str):
    while True:
        try:
            return input_type(input(prompt))
        except ValueError:
            print(f"Invalid input. Please enter a valid {input_type.__name__}.")


def input_costs():
    while True:
        try:
            return [
                int(i)
                for i in input("Enter each cost (separated by comma): ").split(",")
            ]
        except ValueError:
            print("Invalid input. Please enter valid numbers separated by commas.")


def safe_multiline_input_ending_with_backslash(prompt):
    print(prompt)
    lines = []
    while True:
        try:
            line = input()
            if line.endswith("\\"):
                lines.append(line[:-1])  # 백슬래시를 제거하고 추가
                break
            else:
                lines.append(line)
        except ValueError:
            print("Invalid input. Please try again.")
    return "\n".join(lines)


def input_sync_data():
    sync_data = {
        "cost": input_costs(),
        "skill1": {
            "attack": safe_input("Enter skill1 attack: ", int),
            "mental": safe_input("Enter skill1 mental: ", int),
            "skilltype": safe_input("Enter skill1 skilltype: "),
            "name": safe_input("Enter skill1 name: "),
            "coin": safe_input("Enter skill1 coin: ", int),
            "type": safe_input("Enter skill1 type: "),
            "prop": safe_input("Enter skill1 prop: "),
            "power": safe_input("Enter skill1 power: ", int),
            "coinpower": safe_input("Enter skill1 coinpower: ", int),
            "weight": safe_input("Enter skill1 weight: ", int),
            "hit": {
                "start": safe_multiline_input_ending_with_backslash(
                    "Enter skill1 hit start: "
                ),
                "h1": safe_multiline_input_ending_with_backslash(
                    "Enter skill1 hit h1: "
                ),
                "h2": safe_multiline_input_ending_with_backslash(
                    "Enter skill1 hit h2: "
                ),
                "h3": safe_multiline_input_ending_with_backslash(
                    "Enter skill1 hit h3: "
                ),
                "h4": safe_multiline_input_ending_with_backslash(
                    "Enter skill1 hit h4: "
                ),
                "h5": safe_multiline_input_ending_with_backslash(
                    "Enter skill1 hit h5: "
                ),
                "end": safe_multiline_input_ending_with_backslash(
                    "Enter skill1 hit end: "
                ),
            },
        },
        "skill2": {
            "attack": safe_input("Enter skill2 attack: ", int),
            "mental": safe_input("Enter skill2 mental: ", int),
            "skilltype": safe_input("Enter skill2 skilltype: "),
            "name": safe_input("Enter skill2 name: "),
            "coin": safe_input("Enter skill2 coin: ", int),
            "type": safe_input("Enter skill2 type: "),
            "prop": safe_input("Enter skill2 prop: "),
            "power": safe_input("Enter skill2 power: ", int),
            "coinpower": safe_input("Enter skill2 coinpower: ", int),
            "weight": safe_input("Enter skill2 weight: ", int),
            "hit": {
                "start": safe_multiline_input_ending_with_backslash(
                    "Enter skill2 hit start: "
                ),
                "h1": safe_multiline_input_ending_with_backslash(
                    "Enter skill2 hit h1: "
                ),
                "h2": safe_multiline_input_ending_with_backslash(
                    "Enter skill2 hit h2: "
                ),
                "h3": safe_multiline_input_ending_with_backslash(
                    "Enter skill2 hit h3: "
                ),
                "h4": safe_multiline_input_ending_with_backslash(
                    "Enter skill2 hit h4: "
                ),
                "h5": safe_multiline_input_ending_with_backslash(
                    "Enter skill2 hit h5: "
                ),
                "end": safe_multiline_input_ending_with_backslash(
                    "Enter skill2 hit end: "
                ),
            },
        },
        "pass1": {
            "name": safe_input("Enter pass1 name: "),
            "passdescription": safe_multiline_input_ending_with_backslash(
                "Enter pass1 passdescription: "
            ),
        },
    }
    return sync_data


# sync3 데이터를 입력받고, 이를 sync4에도 사용합니다.
sync3_data = input_sync_data()

data = {
    "id": safe_input("Enter ID: ", int),
    "birth": safe_input("Enter birth date (YYYY/MM/DD): "),
    "name": safe_input("Enter name: "),
    "character": safe_input("Enter character: "),
    "desc": {
        "desc1": safe_multiline_input_ending_with_backslash("Enter desc1: ").split("/"),
        "desc2": safe_multiline_input_ending_with_backslash("Enter desc2: ").split("/"),
    },
    "egorank": input("Enter egorank: "),
    "resistance": input("Enter each resistance (separated by comma): ").split(","),
    "get": safe_input("Enter get: "),
    "abnormality": safe_input("Enter abnormality: "),
    "ticket": safe_input("Enter ticket: "),
    "season": safe_input("Enter season: "),
    "sync3": sync3_data,
    "sync4": sync3_data,
    "keyword": input("Enter keywords (separated by comma): ").split(","),
}

print(data)
