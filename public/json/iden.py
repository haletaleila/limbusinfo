def multiline_input_ending_with_backslash(prompt):
    print(prompt)
    lines = []
    while True:
        line = input()
        if line.endswith("\\"):
            lines.append(line[:-1])  # 백슬래시를 제거하고 추가
            break
        else:
            lines.append(line)
    return "\n".join(lines)


# 예를 들어, 이 함수를 사용하여 사용자로부터 여러 줄의 텍스트를 입력받을 수 있습니다.
# 예: multiline_input_ending_with_backslash("Enter your text (end with \\):")


def input_sync_skill(skill_name):
    skill = {
        "skilltype": input(f"Enter {skill_name} skill type: "),
        "skill": input(f"Enter {skill_name} skill: "),
        "coin": int(input(f"Enter {skill_name} coin: ")),
        "name": input(f"Enter {skill_name} name: "),
        "level": int(input(f"Enter {skill_name} level: ")),
        "type": input(f"Enter {skill_name} type: "),
        "prop": input(f"Enter {skill_name} prop: "),
        "power": int(input(f"Enter {skill_name} power: ")),
        "coinpower": int(input(f"Enter {skill_name} coinpower: ")),
        "weight": int(input(f"Enter {skill_name} weight: ")),
        "hit": {
            "start": multiline_input_ending_with_backslash(
                f"Enter {skill_name} hit start: "
            ),
            "h1": multiline_input_ending_with_backslash(f"Enter {skill_name} hit h1: "),
            "h2": multiline_input_ending_with_backslash(f"Enter {skill_name} hit h2: "),
            "h3": multiline_input_ending_with_backslash(f"Enter {skill_name} hit h3: "),
            "h4": multiline_input_ending_with_backslash(f"Enter {skill_name} hit h4: "),
            "h5": multiline_input_ending_with_backslash(f"Enter {skill_name} hit h5: "),
            "end": multiline_input_ending_with_backslash(
                f"Enter {skill_name} hit end: "
            ),
        },
    }
    return skill


def input_sync_data():
    return {
        "life": int(input("Enter life: ")),
        "speed": input("Enter speed: "),
        "defend": int(input("Enter defend: ")),
        "skill1": input_sync_skill("skill1"),
        "skill2": input_sync_skill("skill2"),
        "skill3": input_sync_skill("skill3"),
        "def": input_sync_skill("def"),
        "pass1": {
            "name": input("Enter pass1 name: "),
            "prop": input("Enter pass1 prop: "),
            "poss": int(input("Enter pass1 poss: ")),
            "posstype": input("Enter pass1 posstype: "),
            "passdescription": multiline_input_ending_with_backslash(
                "Enter pass1 passdescription: "
            ),
        },
        "pass2": {
            "name": input("Enter pass2 name: "),
            "prop": input("Enter pass2 prop: "),
            "poss": int(input("Enter pass2 poss: ")),
            "posstype": input("Enter pass2 posstype: "),
            "passdescription": multiline_input_ending_with_backslash(
                "Enter pass2 passdescription: "
            ),
        },
    }


def input_data():
    sync4_data = input_sync_data()
    data = {
        "id": int(input("Enter ID: ")),
        "birth": input("Enter birth date (YYYY/MM/DD): "),
        "name": input("Enter name: "),
        "character": input("Enter character: "),
        "sync": int(input("Enter sync: ")),
        "rank": int(input("Enter rank: ")),
        "resistance": input("Enter resistance (separated by comma): ").split(","),
        "get": input("Enter get: "),
        "ticket": input("Enter ticket: "),
        "season": input("Enter season: "),
        "position": input("Enter position: "),
        "desc": {
            "desc1": input("Enter desc1: ").split("/"),
            "desc2": input("Enter desc2: ").split("/"),
        },
        "sync4": sync4_data,
        "sync3": sync4_data,
        "keyword": input("Enter keywords (separated by comma): ").split(","),
    }

    return data


# Get data from user
character_data = input_data()

# Print the collected data
print(character_data)
