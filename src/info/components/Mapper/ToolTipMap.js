export const ToolTipMap = {
  침잠: "공격 스킬로 피격 시, 효과 위력만큼 고정 정신력 피해를 받음\n(정신력이 없는 대상에게는 우울 속성 피해로 적용됨)\n피격 후 횟수 1 감소",
  마비: "한 턴 동안 수치만큼 코인 위력이 0으로 고정",
  화상: "턴 종료 시, 효과 위력만큼 고정 체력 피해를 받음\n턴 종료 후 횟수 1 감소",
  출혈: "공격 스킬의 코인 판정 시, 효과 위력만큼 고정 체력 피해를 받음\n공격 스킬의 코인 판정 후 횟수 1 감소",
  진동: "진동 폭발 스킬로 피격 시, 효과 위력만큼 흐트러짐 손상\n턴 종료 후 횟수 1 감소",
  파열: "공격 스킬로 피격 시, 효과 위력만큼 고정 체력 피해를 받음\n피격 후 횟수 1 감소",
  취약: "한 턴 동안 스킬로 받는 피해가 수치에 비례하여 증가(최대 10)",
  속박: "한 턴 동안 속도가 수치만큼 감소",
  못: "턴 시작 시 출혈 1을 주고, 출혈 횟수가 수치만큼 증가.\n턴 종료 시 수치가 절반 감소(소수점 버림)",
  주시: "한 턴동안 관통, 타격 속성 스킬로 받는 피해 20% 증가.\n표적이 찍힌 적 처치 시 처치한 아군의 정신력이 10 회복되며,\n해당 아군이 N사 광신도면 다음 턴에 광신 1을 얻음",
  갈증: "즉흥 조리 패시브의 회복량이 수치에 비례하여 증가.\n패시브 발동 시 전부 소모",
  침잠쇄도:
    "(침잠 횟수 x 침잠 위력)만큼 정신 피해를 주고, 침잠 제거\n대상의 정신력이 -45 이하면 초과된 정신 피해를 우울 속성 피해로 가함.\n(정신력이 없는 대상에게는 전부 우울 속성 피해로 적용됨)",
  부적: "수치만큼 공격 적중 시 파열 부여, 피격 시 파열 얻음.\n 턴 종료 시 수치가 6 이상이면,\n부적을 전부 소모하고 수치만큼 고정 피해를 받음",
  저주: "턴 종료 시 공격 위력 감소 1, 수비 위력 감소 1,\n공격 레벨 감소 2, 방어 레벨 감소 2 중 무작위 1개의 효과를 얻고,\n수치 1 감소",
  "결투 선포":
    "결투 선포를 부여한 캐릭터가 부여된 캐릭터와 합 진행 시 합 위력 +1,\n공격 적중 시 다음 턴에 신속 1을 얻음.(턴 당 최대 4회)\n부여한 캐릭터가 다른 대상에게 이 효과를 부여하면 소멸.\n다른 캐릭터의 결투 선포가 부여될 경우 교체됨.",
  "약점 분석":
    "한 턴 동안 공격 유형 내성에서\n'견딤', '보통' 내성 중 무작위 하나를 선택하여 약화[+0.2]시킴",
  "분홍 리본":
    "이번 턴 동안 공격 스킬의 코인을 사용할 때마다 수치 증가.\n턴 종료 시 수치만큼 속박을 얻은 뒤 효과 소멸",
  구더기:
    "턴 종료 시 수치만큼 탐식 피해를 받고,\n출혈 횟수가 1 증가한 뒤 수치 1 감소",
  "차원 균열": "턴 종료 시 파열 횟수가 수치만큼 증가한 뒤 이 효과 소멸",
  "방출 전류":
    "피격 시 공격자의 충전 횟수 1 증가.\n우울 속성으로 피격 시 자신의 파열 횟수 1 증가. 이후 수치 1 감소",

  호흡: "적중 시 효과 위력에 비례한 확률로 치명타 피해를 입힘\n턴 종료 시, 치명타 발동 후 횟수 1 감소",
  신속: "한 턴 동안 속도가 수치만큼 증가",
  보호: "한 턴 동안 스킬로 받는 피해가 수치에 비례하여 감소(최대 10)",
  충전: "소모 시 특정 스킬의 능력이 상승함.\n최대 20까지 얻을 수 있음. 턴 종료 시 1 감소.",
  광신: "이번 턴 동안 못이 부여된 대상 공격 시 최종 위력이 수치만큼 증가(합 진행 시에도 적용됨)",
  "파열 보호": "한 턴 동안 파열 효과로 받는 피해 수치당 1 감소",
  "충전 역장":
    "-(충전 역장 수치 x 3)만큼 보호막을 얻음\n-(충전 역장 수치 x 3)만큼 보호막을 잃으면, 충전 역장 1 감소\n-(효과가 부여된 대상이 W사 직원이면, 보호막 계수가 3 대신 5로 적용됨)\n-턴 종료 시 충전 횟수를 충전 역장 수치만큼 얻고, 충전 역장과 충전 역장 효과로 얻는 보호막 소멸.",

  탄환: "특정 스킬 사용 시 탄환이 소모됨\n탄환이 없을 때 공격이 취소됨",

  도발치:
    "집중 전투에서 도발치가 높은 슬롯일수록 적에게 공격 받을 확률이 증가함",
  시술: "이 수치가 5가 되면 사망함\n최대 체력이 수치에 비례하여 20%씩 감소\n가하는 피해량이 수치에 비례하여 20%씩 증가\n매 턴마다 수치만큼 신속을 얻음",
  "K사 앰플":
    "턴 시작 시 4 미만이면, 최대 체력의 (수치 X 5)% 만큼 체력 회복.\n수치가 4 이상이면, 사망",

  "E.G.O 자원 획득량+":
    "한 턴 동안 스킬 사용 시 획득하는 E.G.O 자원 수가 수치만큼 증가",

  "더하기 코인 강화": "한 턴 동안 더하기 코인 위력이 수치만큼 증가",
  "더하기 코인 약화": "한 턴 동안 더하기 코인 위력이 수치만큼 감소",

  "공격 위력 증가": "한 턴 동안 공격 스킬의 최종 위력이 수치만큼 증가",
  "공격 위력 감소": "한 턴 동안 공격 스킬의 최종 위력이 수치만큼 감소",
  "수비 위력 증가": "한 턴 동안 수비 스킬의 최종 위력이 수치만큼 증가",
  "수비 위력 감소": "한 턴 동안 수비 스킬의 최종 위력이 수치만큼 감소",
  "공격 레벨 증가": "한 턴 동안 공격 레벨이 수치에 비례하여 증가",
  "공격 레벨 감소": "한 턴 동안 공격 레벨이 수치에 비례하여 감소",
  "방어 레벨 증가": "한 턴 동안 방어 레벨이 수치에 비례하여 증가",
  "방어 레벨 감소": "한 턴 동안 방어 레벨이 수치에 비례하여 감소",
  "피해량 증가":
    "한 턴 동안 스킬로 가하는 피해가 수치에 비례하여 증가(최대 10)",
  "피해량 감소":
    "한 턴 동안 스킬로 가하는 피해가 수치에 비례하여 감소(최대 10)",

  "정신력 회복 효율": "정신력 감소 조건에 의한 정신력 회복량",
  "정신력 감소 효율": "정신력 감소 조건에 의한 정신력 감소량",

  "체력 회복 감소":
    "패시브, 스킬, 코인의 효과로 회복하는 체력이 수치에 비례하여 감소(최대 5)",

  "참격 취약":
    "한 턴 동안 참격 스킬로 받는 피해가 수치에 비례하여 증가(최대 10)",
  "관통 취약":
    "한 턴 동안 관통 스킬로 받는 피해가 수치에 비례하여 증가(최대 10)",
  "타격 취약":
    "한 턴 동안 타격 스킬로 받는 피해가 수치에 비례하여 증가(최대 10)",
  "참격 보호":
    "한 턴 동안 참격 속성 스킬로 받는 피해가 수치에 비례하여 감소(최대 10)",
  "관통 보호":
    "한 턴 동안 관통 속성 스킬로 받는 피해가 수치에 비례하여 감소(최대 10)",
  "타격 보호":
    "한 턴 동안 타격 속성 스킬로 받는 피해가 수치에 비례하여 감소(최대 10)",
  "참격 피해량 증가":
    "한 턴 동안 참격 속성 스킬로 가하는 피해가 수치에 비례하여 증가(최대 10)",
  "관통 피해량 증가":
    "한 턴 동안 관통 속성 스킬로 가하는 피해가 수치에 비례하여 증가(최대 10)",
  "타격 피해량 증가":
    "한 턴 동안 타격 속성 스킬로 가하는 피해가 수치에 비례하여 증가(최대 10)",
  "참격 피해량 감소":
    "한 턴 동안 참격 속성 스킬로 가하는 피해가 수치에 비례하여 감소(최대 10)",
  "관통 피해량 감소":
    "한 턴 동안 관통 속성 스킬로 가하는 피해가 수치에 비례하여 감소(최대 10)",
  "타격 피해량 감소":
    "한 턴 동안 타격 속성 스킬로 가하는 피해가 수치에 비례하여 감소(최대 10)",

  "분노 취약":
    "한 턴 동안 분노 속성 스킬로 받는 피해가 수치에 비례하여 증가(최대 10)",
  "색욕 취약":
    "한 턴 동안 색욕 속성 스킬로 받는 피해가 수치에 비례하여 증가(최대 10)",
  "나태 취약":
    "한 턴 동안 나태 속성 스킬로 받는 피해가 수치에 비례하여 증가(최대 10)",
  "탐식 취약":
    "한 턴 동안 탐식 속성 스킬로 받는 피해가 수치에 비례하여 증가(최대 10)",
  "우울 취약":
    "한 턴 동안 우울 속성 스킬로 받는 피해가 수치에 비례하여 증가(최대 10)",
  "오만 취약":
    "한 턴 동안 오만 속성 스킬로 받는 피해가 수치에 비례하여 증가(최대 10)",
  "질투 취약":
    "한 턴 동안 질투 속성 스킬로 받는 피해가 수치에 비례하여 증가(최대 10)",
  "분노 보호":
    "한 턴 동안 분노 속성 스킬로 받는 피해가 수치에 비례하여 감소(최대 10)",
  "색욕 보호":
    "한 턴 동안 색욕 속성 스킬로 받는 피해가 수치에 비례하여 감소(최대 10)",
  "나태 보호":
    "한 턴 동안 나태 속성 스킬로 받는 피해가 수치에 비례하여 감소(최대 10)",
  "탐식 보호":
    "한 턴 동안 탐식 속성 스킬로 받는 피해가 수치에 비례하여 감소(최대 10)",
  "우울 보호":
    "한 턴 동안 우울 속성 스킬로 받는 피해가 수치에 비례하여 감소(최대 10)",
  "오만 보호":
    "한 턴 동안 오만 속성 스킬로 받는 피해가 수치에 비례하여 감소(최대 10)",
  "질투 보호":
    "한 턴 동안 질투 속성 스킬로 받는 피해가 수치에 비례하여 감소(최대 10)",
  "분노 피해량 증가":
    "한 턴 동안 분노 속성 스킬로 가하는 피해가 수치에 비례하여 증가(최대 10)",
  "색욕 피해량 증가":
    "한 턴 동안 색욕 속성 스킬로 가하는 피해가 수치에 비례하여 증가(최대 10)",
  "나태 피해량 증가":
    "한 턴 동안 나태 속성 스킬로 가하는 피해가 수치에 비례하여 증가(최대 10)",
  "탐식 피해량 증가":
    "한 턴 동안 탐식 속성 스킬로 가하는 피해가 수치에 비례하여 증가(최대 10)",
  "우울 피해량 증가":
    "한 턴 동안 우울 속성 스킬로 가하는 피해가 수치에 비례하여 증가(최대 10)",
  "오만 피해량 증가":
    "한 턴 동안 오만 속성 스킬로 가하는 피해가 수치에 비례하여 증가(최대 10)",
  "질투 피해량 증가":
    "한 턴 동안 질투 속성 스킬로 가하는 피해가 수치에 비례하여 증가(최대 10)",
  "질투 위력 증가": "한 턴 동안 질투 위력 증가",
  "나태 위력 증가": "한 턴 동안 나태 위력 증가",
};
