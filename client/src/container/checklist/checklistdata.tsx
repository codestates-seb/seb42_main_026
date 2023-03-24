interface Task {
  id: number;
  description: string;
  completed: boolean;
}

export function checklistdata() {
  const tasks: Task[] = [
    { id: 1, description: '이사할 집 등기부등본 확인', completed: false },
    { id: 2, description: '이사 전 집의 상태를 사진으로 기록하기. (계약 만료 시 책임 전가를 방지하기 위해)', completed: false },
    { id: 3, description: '전입 신고', completed: false },
    {
      id: 4,
      description: '전기, 가스, 수도 청구서 등의 우편물 주소 변경',
      completed: false,
    },
    {
      id: 5,
      description: '배달, 쇼핑몰 등의 주소 변경 (ex. 배달의 민족, 네이버 페이, 요기요, 쿠팡, 티머니 택시)',
      completed: false,
    },
    {
      id: 6,
      description: '계약 전 하자 점검: 수압, 일조량, 곤충 여부, 기본 옵션 확인하기',
      completed: false,
    },
    { id: 7, description: '월세 자동 이체 설정 (해당하는 경우)', completed: false },
    {
      id: 8,
      description: '성범죄자 알림 확인',
      completed: false,
    },
    { id: 9, description: '비상약 및 비축 용품 구매', completed: false },
    { id: 10, description: '주변 인프라 확인', completed: false },
    { id: 11, description: '소음 확인', completed: false },
  ];

  const livingcosts: Task[] = [
    { id: 1, description: '생활비 계산해보고 소비하기 ( 소모품: 샴푸, 휴지, 쓰레기봉투, 식비 등 )  ', completed: false },
    { id: 2, description: '고정 지출 정리하기 ( 식비, 공과금, 휴대폰비, 월세, 대출 이자, 적금, 관리비 등 ) ', completed: false },
    { id: 3, description: '비상금통장 만들기( 생활비의 3~6배 )', completed: false },
    {
      id: 4,
      description: '월세 세액 공제 신청하기',
      completed: false,
    },
    {
      id: 5,
      description: '체크카드 이용하기( 돈의 흐름 파악하기 )',
      completed: false,
    },
    {
      id: 6,
      description: '자주 먹는 프랜차이즈 가게가 있다면 모바일 쿠폰을 이용하기',
      completed: false,
    },
    { id: 7, description: '알뜰 요금제 이용하기', completed: false },
    {
      id: 8,
      description: '급한 돈이 필요하다면 청약 예금 담보 대출 이용하기 ( 일반 대출보다 이율이 낮다. )',
      completed: false,
    },
    { id: 9, description: '모바일 고지서 신청하기 ( 전기, 가스 요금 할인 제도 )', completed: false },
  ];
  return { tasks, livingcosts };
}
