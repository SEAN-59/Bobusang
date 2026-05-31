export type NoticeMock = {
  id: string;
  title: string;
  category: string;
  createdAt: string;
  author?: string;
  target?: string;
  content?: string;
};

export type NoticeCategoryOptionMock = {
  id: string;
  label: string;
  color: string;
  enabled: boolean;
  order: number;
};

export type NoticeTargetOptionMock = {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  order: number;
};

export type NoticeDefaultOptionMock = {
  categoryId: string;
  isVisible: boolean;
  isPinned: boolean;
  sendPush: boolean;
};

export type NoticeOptionsMock = {
  categories: NoticeCategoryOptionMock[];
  targets: NoticeTargetOptionMock[];
  defaults: NoticeDefaultOptionMock;
};

export type AppVersionPlatformMock = 'android' | 'ios';

export type AppVersionMock = {
  id: string;
  platform: AppVersionPlatformMock;
  version: string;
  forceUpdate: boolean;
  showUpdate: boolean;
  showUpdateContent: boolean;
  content: string;
  fileName: string;
  createdAt: string;
};

export type AccountPermissionEmployeeMock = {
  id: string;
  employeeNo: string;
  name: string;
  department: string;
  position: string;
  email: string;
  status: 'active' | 'locked' | 'pending';
};

export type AccountPermissionGroupMock = {
  id: string;
  name: string;
  description: string;
  menuCount: number;
  actionCount: number;
  memberIds: string[];
};

export type AccountManagementMock = {
  permissionGroups: AccountPermissionGroupMock[];
  employees: AccountPermissionEmployeeMock[];
};

export type AccountPersonalInfoSettingsMock = {
  employeeNoPrefix: string;
  employeeNoLength: number;
  employeeNoResetMonth: string;
  initialPasswordRule: string;
  initialPasswordLength: number;
  requirePasswordChange: boolean;
  maskSensitiveInfo: boolean;
};

export type WorkplaceStatusOptionMock = {
  id: string;
  code: string;
  label: string;
  color: string;
  description: string;
  enabled: boolean;
  order: number;
};

export type WorkplaceSettingsMock = {
  statuses: WorkplaceStatusOptionMock[];
  defaultStatusId: string;
  showDisabledStatuses: boolean;
};

export type HomeNotificationMock = {
  id: string;
  title: string;
  category: string;
  createdAt: string;
};

export type AttendanceSummaryMock = {
  total: number;
  present: number;
  late: number;
  unregistered: number;
  absent: number;
  vacation: number;
};

export type AttendanceDailyStatusMock = 'present' | 'late' | 'absent' | 'unregistered' | 'vacation';

export type AttendanceDailyEmployeeMock = {
  id: string;
  employeeNo: string;
  name: string;
  department: string;
  position: string;
  workplace: string;
  status: AttendanceDailyStatusMock;
  schedule: string;
  checkIn: string;
  checkOut: string;
  workHours: string;
  note: string;
};

export type WorksiteAttendanceRegionMock = {
  id: string;
  label: string;
  districts: WorksiteAttendanceDistrictMock[];
};

export type WorksiteAttendanceDistrictMock = {
  id: string;
  provinceName: string;
  label: string;
  workplaceCount: number;
};

export type WorksiteAttendanceStoreSeedMock = {
  brandName: string;
  branchName: string;
  provinceName: string;
  districtName: string;
  roadAddress: string;
};

export type WorksiteOperationStatusMock = 'normal' | 'closed' | 'paused' | 'preparing';

export type WorksiteAttendanceWorkplaceMock = {
  id: string;
  regionId: string;
  districtId: string;
  brandName: string;
  branchName: string;
  provinceName: string;
  districtName: string;
  roadAddress: string;
  name: string;
  address: string;
  manager: string;
  phone: string;
  total: number;
  present: number;
  late: number;
  absent: number;
  unregistered: number;
  vacation: number;
  operationStatus: WorksiteOperationStatusMock;
  lastUpdated: string;
  memo: string;
};

const worksiteAttendanceStoreRows = `
롯데마트	강변점	서울특별시	광진구
롯데마트	거제점	경상남도	거제시
롯데마트	경기양평점	경기도	양평군
롯데마트	계양점	인천광역시	계양구
롯데마트	고양점	경기도	고양시
롯데마트	광교점	경기도	수원시
롯데마트	광복점	부산광역시	중구
롯데마트	구리점	경기도	구리시
롯데마트	구미점	경상북도	구미시
롯데마트	군산점	전북특별자치도	군산시
롯데마트	김천점	경상북도	김천시
롯데마트	김천점	경상북도	김천시
롯데마트	김포공항점	서울특별시	강서구
롯데마트	김포한강점	경기도	김포시
롯데마트	김해점	경상남도	김해시
롯데마트	나주점	전라남도	나주시
롯데마트	남악점	전라남도	무안군
롯데마트	남원점	전북틀별자치도	남원시
롯데마트	노은점	대전광역시	유성구
롯데마트	당진점	충청남도	당진시
롯데마트	대구율하점	대구광역시	동구
롯데마트	대덕점	대전광역시	유성구
롯데마트	덕소점	경기도	남양주시
롯데마트	동두천점	경기도	동두천시
롯데마트	동래점	부산광역시	동래구
롯데마트	동부산점	부산광역시	기장군
롯데마트	롯데몰수지점	경기도	용인시
롯데마트	마산점	경상남도	창원시
롯데마트	마석점	경기도	남양주시
롯데마트	부산점	부산광역시	부산진구
롯데마트	사상점	부산광역시	사상구
롯데마트	사하점	부산광역시	사하구
롯데마트	삼계점	경상남도	창원시
롯데마트	삼양점	서울특별시	강북구
롯데마트	상당점	충청북도	청주시
롯데마트	서대전점	대전광역시	유성구
롯데마트	서산점	충청남도	서산시
롯데마트	서울역점(위탁경영점)	서울특별시	중구
롯데마트	서청주점	충청북도	청주시
롯데마트	서초점	서울특별시	서초구
롯데마트	성정점	충청남도	천안시
롯데마트	송파점	서울특별시	송파구
롯데마트	수완점	광주광역시	광산구
롯데마트	수원점	경기도	수원시
롯데마트	시티세븐점	경상남도	창원시
롯데마트	시흥배곧점	경기도	시흥시
롯데마트	아산터미널점	충청남도	아산시
롯데마트	안산점	경기도	안산시
롯데마트	안성점	경기도	안성시
롯데마트	양덕점	경상남도	창원시
롯데마트	양평점	서울특별시	영등포구
롯데마트	여수점	전라남도	여수시
롯데마트	여천점	전라남도	여수시
롯데마트	영종도점	인천광역시	중구
롯데마트	오산점	경기도	오산시
롯데마트	울산점	울산광역시	남구
롯데마트	웅상점	경상남도	양산시
롯데마트	월드컵점	광주광역시	서구
롯데마트	월드타워점	서울특별시	송파구
롯데마트	은평점	서울특별시	은평구
롯데마트	의왕점	경기도	의왕시
롯데마트	이천점	경기도	이천시
롯데마트	익산점	전북특별자치도	익산시
롯데마트	장암점	경기도	의정부시
롯데마트	장유점	경상남도	김해시
롯데마트	전주점	전북특별자치도	전주시
롯데마트	정읍점	전북특별자치도	정읍시
롯데마트	제천점	충청북도	제천시
롯데마트	제타플렉스점	서울특별시	송파구
롯데마트	주엽점	경기도	고양시
롯데마트	중계점	서울특별시	노원구
롯데마트	진장점	울산광역시	북구
롯데마트	진주점	경상남도	진주시
롯데마트	진해점	경상남도	창원시
롯데마트	천호점	서울특별시	강동구
롯데마트	첨단점	광주광역시	광산구
롯데마트	청량리점	서울특별시	동대문구
롯데마트	청주점	충청북도	청주시
롯데마트	충주점	충청북도	충주시
롯데마트	통영점	경상남도	통영시
롯데마트	판교점	경기도	성남시
롯데마트	평택점	경기도	평택시
롯데마트	포항점	경상북도	포항시
롯데마트	포항점	경상북도	포항시
롯데마트	행당역점	서울특별시	성동구
롯데마트	홍성점	충청남도	홍성군
롯데마트	화명점	부산광역시	북구
롯데마트	화정점	경기도	고양시
이마트	가든5점	서울특별시	송파구
이마트	검단점	인천광역시	서구
이마트	경기광주점	경기도	광주시
이마트	경산점	경상북도	경산시
이마트	계양점	인천광역시	계양구
이마트	고덕점	서울특별시	강동구
이마트	과천점	경기도	과천시
이마트	광교점	경기도	수원시
이마트	광명소하점	경기도	광명시
이마트	광산점	광주광역시	광산구
이마트	광주점	광주광역시	서구
이마트	구로점	서울특별시	구로구
이마트	구미점	경상북도	구미시
이마트	군산점	전북특별자치도	군산시
이마트	금정점	부산광역시	금정구
이마트	김천점	경상북도	김천시
이마트	김천점	경상북도	김천시
이마트	김포한강점	경기도	김포시
이마트	김해점	경상남도	사천시
이마트	남양주점	경기도	남양주시
이마트	남원점	전북특별자치도	남원시
이마트	다산점	경기도	남양주시
이마트	대전터미널점	대전광역시	동구
이마트	동구미점	경상북도	포항시
이마트	동백점	경기도	용인시
이마트	동인천점	인천광역시	중구
이마트	동탄점	경기도	화성시
이마트	둔산점	대전광역시	서구
이마트	마산점	경상남도	창원시
이마트	마포점	서울특별시	마포구
이마트	만촌점	대구광역시	수성구
이마트	명일점	서울특별시	강동구
이마트	목동점	서울특별시	양천구
이마트	목포점	전라남도	목포시
이마트	묵동점	서울특별시	중랑구
이마트	문현점	부산광역시	남구
이마트	미아점	서울특별시	성북구
이마트	반야월점	대구광역시	동구
이마트	별내점	경기도	남양주시
이마트	보라점	용인시	기흥구
이마트	보령점	충청남도	보령시
이마트	봉선점	광주광역시	남구
이마트	분당점	경기도	성남시
이마트	사상점	부산광역시	사상구
이마트	사천점	경상남도	사천시
이마트	산본점	경기도	군포시
이마트	상주점	경상북도	상주시
이마트	상주점	경상북도	상주시
이마트	서산점	충청남도	서산시
이마트	서수원점	경기도	수원시
이마트	성남점	경기도	성남시
이마트	성서점	대구광역시	달서구
이마트	세종점	세종특별자치시	금송로
이마트	수색점	서울특별시	은평구
이마트	수서점	서울특별시	강남구
이마트	수원점	경기도	수원시
이마트	수지점	경기도	용인시
이마트	순천점	전라남도	순천시
이마트	신도림점	서울특별시	구로구
이마트	신월점	서울특별시	양천구
이마트	신촌점	경기도	고양시
이마트	아산점	충청남도	아산시
이마트	안동점	경상북도	안동시
이마트	안동점	경상북도	안동시
이마트	안산고잔점	경기도	안산시
이마트	안성점	경기도	안성시
이마트	양산점	경상남도	양산시
이마트	양재점	서울특별시	서초구
이마트	양주점	경기도	양주시
이마트	에코시티점	전북특별자치도	전주시
이마트	여수점	전라남도	여수시
이마트	여의도점	서울특별시	영등포구
이마트	여주점	경기도	여주시
이마트	역삼점	서울특별시	강남구
이마트	연수점	인천광역시	연수구
이마트	연제점	부산광역시	연제구
이마트	영등포점	서울특별시	영등포구
이마트	영천점	경상북도	영천시
이마트	영천점	경상북도	영천시
이마트	오산점	경기도	오산시
이마트	왕십리점	서울특별시	성동구
이마트	용산점	서울특별시	용산구
이마트	용인점	경기도	용인시
이마트	울산점	울산광역시	남구
이마트	월계점	서울특별시	노원구
이마트	월배점	대구광역시	달서구
이마트	은평점	서울특별시	은평구
이마트	의왕점	경기도	의왕시
이마트	의정부점	경기도	의정부시
이마트	이천점	경기도	이천시
이마트	익산점	전북특별자치도	익산시
이마트	일산점	경기도	고양시
이마트	자양점	서울특별시	광진구
이마트	전주점	전북특별자치도	전주시
이마트	제천점	충청북도	제천시
이마트	죽전점	경기도	용인시
이마트	중동점	경기도	부천시
이마트	진접점	경기도	남양주시
이마트	진주점	경상남도	진주시
이마트	창동점	서울특별시	도봉구
이마트	창원점	경상남도	창원시
이마트	천안서북점	충청남도	천안시
이마트	천안점	충청남도	천안시
이마트	천안터미널점	충청남도	천안시
이마트	천호점	서울특별시	강동구
이마트	청계천점	서울특별시	중구
이마트	청주점	충청북도	청주시
이마트	충주점	충청북도	충주시
이마트	칠성점	대구광역시	북구
이마트	통영점	경상남도	통영시
이마트	파주운정점	경기도	파주시
이마트	파주점	경기도	파주시
이마트	평촌점	경기도	안양시
이마트	평택점	경기도	평택시
이마트	포천점	경기도	포천시
이마트	포항이동점	경상북도	포항시
이마트	포항점	경상북도	포항시
이마트	풍산점	경기도	고양시
이마트	하남점	경기도	하남시
이마트	하월곡점	서울특별시	성북구
이마트	해운대점	부산광역시	해운대구
이마트	화성봉담점	경기도	화성시
이마트	화정점	경기도	고양시
이마트	흥덕점	경기도	용인시
이마트	F수성점	대구광역시	수성구
이마트	FC부천점	경기도	부천시
이마트	FC안양점	경기도	안양시
홈플러스	가양점	서울특별시	강서구
홈플러스	가좌점	인천광역시	서구
홈플러스	강동점	서울특별시	강동구
홈플러스	강서점	서울특별시	강서구
홈플러스	거제점	경상남도	거제시
홈플러스	경기하남점	경기도	하남시
홈플러스	경남진주점	경상남도	진주시
홈플러스	경산점	경상북도	경산시
홈플러스	경주점	경상북도	경주시
홈플러스	계룡점	충청남도	계룡시
홈플러스	고양터미널점	경기도	고양시
홈플러스	광양점	전라남도	광양시
홈플러스	광주하남점	광주광역시	광산구
홈플러스	구미점	경상북도	구미시
홈플러스	김제점	전북특별자치도	김제시
홈플러스	김포점	경기도	김포시
홈플러스	김해점	경상남도	김해시
홈플러스	남대구점	대구광역시	남구
홈플러스	남양주진접점	경기도	남양주시
홈플러스	내당점	대구광역시	서구
홈플러스	논산점	충청남도	논산시
홈플러스	대구수성점	대구광역시	수성구
홈플러스	대전가오점	대전광역시	동구
홈플러스	동광주점	광주광역시	북구
홈플러스	동대문점	서울특별시	동대문구
홈플러스	동래점	부산광역시	동래구
홈플러스	동수원점	경기도	수원시
홈플러스	동청주점	충청북도	청주시
홈플러스	동촌점	대구광역시	동구
홈플러스	마산점	경상남도	창원시
홈플러스	면목점	서울특별시	중랑구
홈플러스	목포점	전라남도	목포시
홈플러스	문경점	경상북도	문경시
홈플러스	문화점	대전광역시	중구
홈플러스	밀양점	경상남도	밀양시
홈플러스	방학점	서울특별시	도봉구
홈플러스	병점점	경기도	화성시
홈플러스	보령점	충청남도	보령시
홈플러스	부산감만점	부산광역시	남구
홈플러스	부산반여점	부산광역시	해운대구
홈플러스	부산정관점	부산광역시	기장군
홈플러스	부천상동점	경기도	부천시
홈플러스	부천소사점	경기도	부천시
홈플러스	부천여월점	경기도	부천시
홈플러스	북수원점	경기도	수원시
홈플러스	분당오리점	경기도	성남시
홈플러스	삼천포점	경상남도	사천시
홈플러스	상인점	대구광역시	달서구
홈플러스	서부산점	부산광역시	사상구
홈플러스	서수원점	경기도	수원시
홈플러스	서울상봉점	서울특별시	망우로
홈플러스	성서점	대구광역시	달서구
홈플러스	세종점	세종특별자치시	절재로
홈플러스	센텀시티점	부산광역시	해운대구
홈플러스	송도점	인천광역시	연수구
홈플러스	송탄점	경기도	평택시
홈플러스	순천점	전라남도	순천시
홈플러스	순천풍덕점	전라남도	순천시
홈플러스	신내점	서울특별시	중랑구
홈플러스	신도림점	서울특별시	구로구
홈플러스	아시아드점	부산광역시	연제구
홈플러스	안동점	경상북도	안동시
홈플러스	야탑점	경기도	성남시
홈플러스	영도점	부산광역시	영도구
홈플러스	영등포점	서울특별시	영등포구
홈플러스	영주점	경상북도	영주시
홈플러스	영통점	경기도	수원시
홈플러스	오산점	경기도	오산시
홈플러스	오창점	충청북도	청주시
홈플러스	울산남구점	울산광역시	남구
홈플러스	울산동구점	울산광역시	동구
홈플러스	울산북구점	울산광역시	북구
홈플러스	울산점	울산광역시	중구
홈플러스	원천점	경기도	수원시
홈플러스	월곡점	서울특별시	성북구
홈플러스	월드컵점	서울특별시	마포구
홈플러스	유성점	대전광역시	유성구
홈플러스	의정부점	경기도	의정부시
홈플러스	익산점	전북특별자치도	익산시
홈플러스	인천논현점	인천광역시	남동구
홈플러스	인천청라점	인천광역시	서구
홈플러스	일산점	경기도	고양시
홈플러스	작전점	인천광역시	계양구
홈플러스	잠실점	서울특별시	송파구
홈플러스	장림점	부산광역시	사하구
홈플러스	전북전주점	전북특별자치도	전주시
홈플러스	전주완산점	전북특별자치도	전주시
홈플러스	전주효자점	전북특별자치도	전주시
홈플러스	조치원점	세종특별자치시	조치원읍
홈플러스	죽도점	경상북도	포항시
홈플러스	중계점	서울특별시	노원구
홈플러스	진해점	경상남도	창원시
홈플러스	창원점	경상남도	창원시
홈플러스	천안신방점	충청남도	천안시
홈플러스	천안점	충청남도	천안시
홈플러스	청주성안점	충청북도	청주시
홈플러스	청주점	충청북도	청주시
홈플러스	칠곡점	대구광역시	북구
홈플러스	킨텍스점	경기도	고양시
홈플러스	파주문산점	경기도	파주시
홈플러스	파주운정점	경기도	파주시
홈플러스	평택안중점	경기도	평택시
홈플러스	포천송우점	경기도	포천시
홈플러스	포항점	경상북도	포항시
홈플러스	풍무점	경기도	김포시
홈플러스	합정점	서울특별시	마포구
홈플러스	화성동탄점	경기도	화성시
홈플러스	화성향남점	화성시	향남읍
`.trim();

const worksiteAttendanceStores = worksiteAttendanceStoreRows.split('\n').map((row) => {
  const [brandName, branchName, provinceName, districtName] = row.split('\t');

  return {
    brandName,
    branchName,
    provinceName,
    districtName,
    roadAddress: `${provinceName} ${districtName}`,
  };
}) satisfies WorksiteAttendanceStoreSeedMock[];

const getWorksiteProvinceId = (provinceName: string) => `province:${provinceName}`;
const getWorksiteDistrictId = (provinceName: string, districtName: string) => `district:${provinceName}:${districtName}`;

const createWorksiteAttendanceRegions = (stores: WorksiteAttendanceStoreSeedMock[]) => {
  return stores.reduce<WorksiteAttendanceRegionMock[]>((regions, store) => {
    const regionId = getWorksiteProvinceId(store.provinceName);
    let region = regions.find((item) => item.id === regionId);

    if (!region) {
      region = { id: regionId, label: store.provinceName, districts: [] };
      regions.push(region);
    }

    const districtId = getWorksiteDistrictId(store.provinceName, store.districtName);
    const district = region.districts.find((item) => item.id === districtId);

    if (district) {
      district.workplaceCount += 1;
    } else {
      region.districts.push({
        id: districtId,
        provinceName: store.provinceName,
        label: store.districtName,
        workplaceCount: 1,
      });
    }

    return regions;
  }, []);
};

const createWorksiteAttendanceWorkplaces = (stores: WorksiteAttendanceStoreSeedMock[]) => {
  const managerNames = ['김민준', '이서연', '박지호', '최하윤', '정도윤', '강서준', '한지우', '오유진'];

  return stores.map<WorksiteAttendanceWorkplaceMock>((store, index) => {
    const total = 10 + ((index * 3) % 18);
    const late = index % 5 === 0 ? 2 : index % 3 === 0 ? 1 : 0;
    const absent = index % 11 === 0 ? 1 : 0;
    const unregistered = index % 7 === 0 ? 1 : 0;
    const vacation = index % 4 === 0 ? 2 : 1;
    const present = Math.max(total - late - absent - unregistered - vacation, 0);

    return {
      id: `site-${String(index + 1).padStart(3, '0')}`,
      regionId: getWorksiteProvinceId(store.provinceName),
      districtId: getWorksiteDistrictId(store.provinceName, store.districtName),
      brandName: store.brandName,
      branchName: store.branchName,
      provinceName: store.provinceName,
      districtName: store.districtName,
      roadAddress: store.roadAddress,
      name: `${store.brandName} ${store.branchName}`,
      address: store.roadAddress,
      manager: managerNames[index % managerNames.length],
      phone: `02-${String(1000 + index).padStart(4, '0')}-${String(2000 + index).padStart(4, '0')}`,
      total,
      present,
      late,
      absent,
      unregistered,
      vacation,
      operationStatus: (index % 23 === 0 ? 'closed' : index % 17 === 0 ? 'paused' : index % 13 === 0 ? 'preparing' : 'normal') as WorksiteOperationStatusMock,
      lastUpdated: `09:${String(10 + (index % 35)).padStart(2, '0')}`,
      memo: late + absent + unregistered > 1 ? '근태 이상 인원 확인 필요' : '정상 운영',
    };
  });
};

export type MonthlyWorkforceMock = {
  defaultCount: number;
  overrides: Record<string, number>;
};

export type PublicHolidayMock = {
  date: string;
  label: string;
};

export type AdminProfileMock = {
  initial: string;
  name: string;
  email: string;
  organization: string;
};

export type SidebarMenuIconKey =
  | 'star'
  | 'realtime'
  | 'attendance'
  | 'attendanceRecord'
  | 'calendarMonth'
  | 'approval'
  | 'leave'
  | 'statistics'
  | 'notice'
  | 'push'
  | 'notification'
  | 'employees'
  | 'organization'
  | 'position'
  | 'workplace'
  | 'qr'
  | 'location'
  | 'adminAccount'
  | 'permission'
  | 'settings'
  | 'logs'
  | 'manage_account'
  | 'manage_version'
  | 'manage_certificate'
  | 'manage_menu'
  | 'move_ai'
  | 'docs';

export type SidebarArrowIconKey = 'arrowUp' | 'arrowDown';

export type SidebarNavigationItemMock = {
  id: string;
  label: string;
  href?: string;
  iconKey?: SidebarMenuIconKey;
  badge?: string;
  disabled?: boolean;
  tooltip?: string;
  subItems?: SidebarNavigationSubItemMock[];
};

export type SidebarNavigationSubItemMock = {
  id: string;
  label: string;
  href?: string;
};

export type SidebarNavigationGroupMock = {
  id?: string;
  title?: string;
  groupIconKey?: SidebarMenuIconKey;
  dividerAfter?: boolean;
  collapsible?: boolean;
  defaultOpen?: boolean;
  arrowUpIconKey?: SidebarArrowIconKey;
  arrowDownIconKey?: SidebarArrowIconKey;
  items: SidebarNavigationItemMock[];
};

export const mockData = {
  adminProfile: {
    initial: 'A',
    name: 'Admin',
    email: 'admin@jeil.local',
    organization: 'JEIL BO Organization',
  } satisfies AdminProfileMock,
  sidebarNavigation: [
    {
      id: 'favorites',
      title: '즐겨 찾기',
      groupIconKey: 'star',
      dividerAfter: true,
      collapsible: true,
      defaultOpen: true,
      arrowUpIconKey: 'arrowUp',
      arrowDownIconKey: 'arrowDown',
      items: [],
    },
    {
      id: 'attendance',
      title: '근태 관리',
      collapsible: true,
      defaultOpen: true,
      arrowUpIconKey: 'arrowUp',
      arrowDownIconKey: 'arrowDown',
      items: [
        {
          id: 'realtime',
          label: '실시간 현황',
          href: '#',
          iconKey: 'realtime',
          subItems: [
            { id: 'realtime-daily', label: '일일 현황', href: '#' },
            { id: 'realtime-sites', label: '근무지별 현황', href: '#' },
          ],
        },
        {
          id: 'attendance-record',
          label: '출퇴근 기록',
          href: '#',
          iconKey: 'attendanceRecord',
          subItems: [
            { id: 'attendance-record-list', label: '기록 조회', href: '#' },
            { id: 'attendance-record-worksites', label: '근무지 기록 조회', href: '#' },
          ],
        },
        {
          id: 'work-schedule',
          label: '근무 일정',
          href: '#',
          iconKey: 'calendarMonth',
          subItems: [
            { id: 'work-schedule-monthly', label: '월간 일정', href: '#' },
            { id: 'work-schedule-assignment', label: '근무 배정', href: '#' },
          ],
        },
      ],
    },
    {
      id: 'approval',
      title: '결재 관리',
      collapsible: true,
      defaultOpen: true,
      arrowUpIconKey: 'arrowUp',
      arrowDownIconKey: 'arrowDown',
      items: [
        {
          id: 'draft-management',
          label: '기안 관리',
          href: '#',
          iconKey: 'approval',
          disabled: true,
          tooltip: '2차 개발',
          subItems: [{ id: 'draft-management-list', label: '기안 목록', href: '#' }],
        },
      ],
    },
    {
      id: 'notice',
      title: '알림 관리',
      collapsible: true,
      defaultOpen: true,
      arrowUpIconKey: 'arrowUp',
      arrowDownIconKey: 'arrowDown',
      items: [
        {
          id: 'notices',
          label: '공지사항',
          href: '#',
          iconKey: 'notice',
          subItems: [
            { id: 'notices-list', label: '공지 목록', href: '#' },
            { id: 'notices-create', label: '공지 등록', href: '#' },
          ],
        },
        {
          id: 'push-message',
          label: '푸시 발송',
          href: '#',
          iconKey: 'push',
          disabled: true,
          tooltip: '2차 개발',
          subItems: [
            { id: 'push-message-create', label: '발송 등록', href: '#' },
            { id: 'push-message-reserved', label: '예약 발송', href: '#' },
            { id: 'push-message-templates', label: '템플릿', href: '#' },
          ],
        },
        {
          id: 'notification-history',
          label: '알림 내역',
          href: '#',
          iconKey: 'notification',
          disabled: true,
          tooltip: '2차 개발',
          subItems: [
            { id: 'notification-history-list', label: '발송 내역', href: '#' },
            { id: 'notification-history-failed', label: '실패 내역', href: '#' },
          ],
        },
      ],
    },
    {
      id: 'hr',
      title: '인사 관리',
      collapsible: true,
      defaultOpen: true,
      arrowUpIconKey: 'arrowUp',
      arrowDownIconKey: 'arrowDown',
      items: [
        {
          id: 'employees',
          label: '직원 관리',
          href: '#',
          iconKey: 'employees',
          subItems: [
            { id: 'employees-list', label: '직원 목록', href: '#' },
            { id: 'employees-create', label: '직원 등록', href: '#' },
          ],
        },
        {
          id: 'organization-management',
          label: '조직 관리',
          href: '#',
          iconKey: 'organization',
          subItems: [
            { id: 'departments', label: '부서 관리', href: '#' },
            { id: 'positions', label: '직급 관리', href: '#' },
          ],
        },
        {
          id: 'employment-management',
          label: '입퇴사 관리',
          href: '#',
          iconKey: 'position',
          disabled: true,
          tooltip: '2차 개발',
          subItems: [
            { id: 'employment-onboarding', label: '입사 처리', href: '#' },
            { id: 'employment-offboarding', label: '퇴사 처리', href: '#' },
            { id: 'employment-status', label: '재직 상태 관리', href: '#' },
          ],
        },
        {
          id: 'hr-info-settings',
          label: '인사 정보 설정',
          href: '#',
          iconKey: 'settings',
          disabled: true,
          tooltip: '2차 개발',
          subItems: [
            { id: 'employee-number-rule', label: '사번 규칙', href: '#' },
            { id: 'hr-title-options', label: '직책 / 직급 옵션', href: '#' },
            { id: 'work-type-options', label: '근무 형태 옵션', href: '#' },
          ],
        },
      ],
    },
    {
      id: 'workplace',
      title: '근무지 관리',
      collapsible: true,
      defaultOpen: true,
      arrowUpIconKey: 'arrowUp',
      arrowDownIconKey: 'arrowDown',
      items: [
        {
          id: 'workplaces',
          label: '근무지',
          href: '#',
          iconKey: 'workplace',
          subItems: [
            { id: 'workplaces-list', label: '근무지 목록', href: '#' },
            { id: 'workplaces-create', label: '근무지 등록', href: '#' },
          ],
        },
      ],
    },
    {
      id: 'system',
      title: '시스템 관리',
      collapsible: true,
      defaultOpen: true,
      arrowUpIconKey: 'arrowUp',
      arrowDownIconKey: 'arrowDown',
      items: [
        {
          id: 'account-management',
          label: '계정 관리',
          href: '#',
          iconKey: 'manage_account',
          subItems: [
            { id: 'account-management-roles', label: '권한 그룹', href: '#' },
            { id: 'account-management-menu-access', label: '메뉴 접근 권한', href: '#' },
            { id: 'account-management-personal-info', label: '개인 정보 관리', href: '#' },
          ],
        },
        {
          id: 'version-management',
          label: '버전 관리',
          href: '#',
          iconKey: 'manage_version',
          subItems: [
            { id: 'version-management-app', label: '앱 버전', href: '#' },
          ],
        },
        {
          id: 'attendance-auth-management',
          label: '근태 인증 관리',
          href: '#',
          iconKey: 'manage_certificate',
          subItems: [
            { id: 'attendance-auth-input-policy', label: '출퇴근 입력 정책', href: '#' },
          ],
        },
        {
          id: 'menu-settings',
          label: '메뉴 관리',
          href: '#',
          iconKey: 'manage_menu',
          subItems: [
            { id: 'menu-settings-general', label: '메뉴 설정', href: '#' },
            { id: 'menu-settings-notices', label: '공지사항 설정', href: '#' },
            { id: 'menu-settings-workplace', label: '근무지 설정', href: '#' },
            { id: 'menu-settings-schedules', label: '일정 관리', href: '#' },
          ],
        },
        {
          id: 'ai-dashboard',
          label: 'AI 대시보드',
          href: '#',
          iconKey: 'move_ai',
          disabled: true,
          tooltip: '추후 개발',
        },
        {
          id: 'log-management',
          label: '로그 관리',
          href: '#',
          iconKey: 'docs',
          disabled: true,
          tooltip: '추후 개발',
        },
      ],
    },
  ] satisfies SidebarNavigationGroupMock[],
  noticeOptions: {
    categories: [
      { id: '공지', label: '공지', color: '#e86d1f', enabled: true, order: 1 },
      { id: '점검', label: '점검', color: '#2289b6', enabled: true, order: 2 },
      { id: '운영', label: '운영', color: '#2ba35d', enabled: true, order: 3 },
      { id: '근태', label: '근태', color: '#d62929', enabled: true, order: 4 },
      { id: '인사', label: '인사', color: '#7c5cc4', enabled: true, order: 5 },
    ],
    targets: [
      { id: 'all', label: '전체', description: '모든 노출 채널', enabled: true, order: 1 },
      { id: 'admin', label: '관리자', description: 'BO 관리자 화면', enabled: true, order: 2 },
      { id: 'employee-app', label: '임직원 앱', description: '모바일 앱 공지 영역', enabled: true, order: 3 },
      { id: 'organization', label: '특정 조직', description: '부서 또는 지점 단위 지정', enabled: true, order: 4 },
    ],
    defaults: {
      categoryId: '공지',
      isVisible: true,
      isPinned: false,
      sendPush: false,
    },
  } satisfies NoticeOptionsMock,
  appVersions: [
    {
      id: 'app-version-001',
      platform: 'android',
      version: '1.4.2',
      forceUpdate: false,
      showUpdate: true,
      showUpdateContent: true,
      content: '근태 입력 안정화 및 QR 인식 속도를 개선했습니다.',
      fileName: 'smart-jeil-1.4.2.apk',
      createdAt: '2026-05-08',
    },
    {
      id: 'app-version-002',
      platform: 'ios',
      version: '1.4.2',
      forceUpdate: false,
      showUpdate: true,
      showUpdateContent: true,
      content: '월간 일정 화면의 표시 오류를 수정했습니다.',
      fileName: 'App Store 배포',
      createdAt: '2026-05-08',
    },
    {
      id: 'app-version-003',
      platform: 'android',
      version: '1.4.1',
      forceUpdate: true,
      showUpdate: true,
      showUpdateContent: true,
      content: '로그인 토큰 갱신 오류를 수정한 필수 업데이트입니다.',
      fileName: 'smart-jeil-1.4.1.apk',
      createdAt: '2026-04-30',
    },
    {
      id: 'app-version-004',
      platform: 'ios',
      version: '1.4.1',
      forceUpdate: true,
      showUpdate: true,
      showUpdateContent: true,
      content: '로그인 토큰 갱신 오류를 수정한 필수 업데이트입니다.',
      fileName: 'App Store 배포',
      createdAt: '2026-04-30',
    },
    {
      id: 'app-version-005',
      platform: 'android',
      version: '1.4.0',
      forceUpdate: false,
      showUpdate: true,
      showUpdateContent: true,
      content: '근무지 QR 인증과 알림 내역 화면을 추가했습니다.',
      fileName: 'smart-jeil-1.4.0.apk',
      createdAt: '2026-04-18',
    },
    {
      id: 'app-version-006',
      platform: 'ios',
      version: '1.4.0',
      forceUpdate: false,
      showUpdate: true,
      showUpdateContent: true,
      content: '근무지 QR 인증과 알림 내역 화면을 추가했습니다.',
      fileName: 'App Store 배포',
      createdAt: '2026-04-18',
    },
    {
      id: 'app-version-007',
      platform: 'android',
      version: '1.3.5',
      forceUpdate: false,
      showUpdate: false,
      showUpdateContent: false,
      content: '내부 테스트용 빌드입니다.',
      fileName: 'smart-jeil-1.3.5.apk',
      createdAt: '2026-04-04',
    },
    {
      id: 'app-version-008',
      platform: 'ios',
      version: '1.3.5',
      forceUpdate: false,
      showUpdate: false,
      showUpdateContent: false,
      content: '내부 테스트용 빌드입니다.',
      fileName: 'TestFlight 배포',
      createdAt: '2026-04-04',
    },
    {
      id: 'app-version-009',
      platform: 'android',
      version: '1.3.4',
      forceUpdate: false,
      showUpdate: true,
      showUpdateContent: true,
      content: '휴가 일정 표시 방식을 개선했습니다.',
      fileName: 'smart-jeil-1.3.4.apk',
      createdAt: '2026-03-21',
    },
    {
      id: 'app-version-010',
      platform: 'ios',
      version: '1.3.4',
      forceUpdate: false,
      showUpdate: true,
      showUpdateContent: true,
      content: '휴가 일정 표시 방식을 개선했습니다.',
      fileName: 'App Store 배포',
      createdAt: '2026-03-21',
    },
    {
      id: 'app-version-011',
      platform: 'android',
      version: '1.3.3',
      forceUpdate: false,
      showUpdate: true,
      showUpdateContent: false,
      content: '푸시 알림 수신 상태를 안정화했습니다.',
      fileName: 'smart-jeil-1.3.3.apk',
      createdAt: '2026-03-08',
    },
    {
      id: 'app-version-012',
      platform: 'ios',
      version: '1.3.3',
      forceUpdate: false,
      showUpdate: true,
      showUpdateContent: false,
      content: '푸시 알림 수신 상태를 안정화했습니다.',
      fileName: 'App Store 배포',
      createdAt: '2026-03-08',
    },
  ] satisfies AppVersionMock[],
  accountManagement: {
    permissionGroups: [
      {
        id: 'role-super-admin',
        name: '최고 관리자',
        description: '전체 메뉴와 시스템 설정을 관리합니다.',
        menuCount: 28,
        actionCount: 64,
        memberIds: ['account-001', 'account-002', 'account-003'],
      },
      {
        id: 'role-hr-admin',
        name: '인사 관리자',
        description: '직원 정보와 인사 메뉴를 관리합니다.',
        menuCount: 12,
        actionCount: 32,
        memberIds: ['account-004', 'account-005', 'account-006', 'account-007'],
      },
      {
        id: 'role-attendance-admin',
        name: '근태 관리자',
        description: '실시간 현황, 기록 조회, 근무 일정 메뉴를 관리합니다.',
        menuCount: 14,
        actionCount: 36,
        memberIds: ['account-008', 'account-009', 'account-010', 'account-011', 'account-012'],
      },
      {
        id: 'role-notice-admin',
        name: '알림 관리자',
        description: '공지사항과 푸시 발송 메뉴를 관리합니다.',
        menuCount: 8,
        actionCount: 18,
        memberIds: ['account-013', 'account-014'],
      },
      {
        id: 'role-workplace-admin',
        name: '근무지 관리자',
        description: '근무지 정보와 QR 재발급을 관리합니다.',
        menuCount: 10,
        actionCount: 24,
        memberIds: ['account-015', 'account-016', 'account-017'],
      },
    ],
    employees: [
      { id: 'account-001', employeeNo: '0000-0001', name: '김민준', department: '운영팀', position: '매니저', email: 'minjun.kim@jeil.local', status: 'active' },
      { id: 'account-002', employeeNo: '0000-0002', name: '이서연', department: '운영팀', position: '팀원', email: 'seoyeon.lee@jeil.local', status: 'active' },
      { id: 'account-003', employeeNo: '0000-0003', name: '박지호', department: '시설팀', position: '팀원', email: 'jiho.park@jeil.local', status: 'active' },
      { id: 'account-004', employeeNo: '0000-0004', name: '최하윤', department: '인사팀', position: '팀장', email: 'hayoon.choi@jeil.local', status: 'active' },
      { id: 'account-005', employeeNo: '0000-0005', name: '정도윤', department: '물류팀', position: '팀원', email: 'doyoon.jeong@jeil.local', status: 'active' },
      { id: 'account-006', employeeNo: '0000-0006', name: '강서준', department: '시설팀', position: '파트장', email: 'seojun.kang@jeil.local', status: 'locked' },
      { id: 'account-007', employeeNo: '0000-0007', name: '한지우', department: '영업팀', position: '팀원', email: 'jiwoo.han@jeil.local', status: 'active' },
      { id: 'account-008', employeeNo: '0000-0008', name: '오유진', department: '영업팀', position: '팀원', email: 'yujin.oh@jeil.local', status: 'active' },
      { id: 'account-009', employeeNo: '0000-0009', name: '윤태양', department: '물류팀', position: '팀장', email: 'taeyang.yoon@jeil.local', status: 'pending' },
      { id: 'account-010', employeeNo: '0000-0010', name: '임수아', department: '인사팀', position: '팀원', email: 'sua.lim@jeil.local', status: 'active' },
      { id: 'account-011', employeeNo: '0000-0011', name: '서준호', department: '운영팀', position: '팀원', email: 'junho.seo@jeil.local', status: 'active' },
      { id: 'account-012', employeeNo: '0000-0012', name: '문채원', department: '시설팀', position: '팀원', email: 'chaewon.moon@jeil.local', status: 'active' },
      { id: 'account-013', employeeNo: '0000-0013', name: '장예준', department: '홍보팀', position: '팀장', email: 'yejun.jang@jeil.local', status: 'active' },
      { id: 'account-014', employeeNo: '0000-0014', name: '신나은', department: '홍보팀', position: '팀원', email: 'naeun.shin@jeil.local', status: 'active' },
      { id: 'account-015', employeeNo: '0000-0015', name: '권도현', department: '현장관리팀', position: '팀장', email: 'dohyun.kwon@jeil.local', status: 'active' },
      { id: 'account-016', employeeNo: '0000-0016', name: '배유나', department: '현장관리팀', position: '팀원', email: 'yuna.bae@jeil.local', status: 'active' },
      { id: 'account-017', employeeNo: '0000-0017', name: '조하준', department: '현장관리팀', position: '팀원', email: 'hajun.jo@jeil.local', status: 'active' },
      { id: 'account-018', employeeNo: '0000-0018', name: '남서아', department: '회계팀', position: '팀원', email: 'seoa.nam@jeil.local', status: 'active' },
      { id: 'account-019', employeeNo: '0000-0019', name: '문시우', department: '개발팀', position: '팀원', email: 'siwoo.moon@jeil.local', status: 'pending' },
      { id: 'account-020', employeeNo: '0000-0020', name: '유지민', department: '개발팀', position: '파트장', email: 'jimin.yoo@jeil.local', status: 'active' },
      { id: 'account-021', employeeNo: '0000-0021', name: '정하린', department: '인사팀', position: '팀원', email: 'harin.jeong@jeil.local', status: 'active' },
      { id: 'account-022', employeeNo: '0000-0022', name: '백도겸', department: '운영팀', position: '팀원', email: 'dogyeom.baek@jeil.local', status: 'active' },
      { id: 'account-023', employeeNo: '0000-0023', name: '송아린', department: '영업팀', position: '매니저', email: 'arin.song@jeil.local', status: 'active' },
      { id: 'account-024', employeeNo: '0000-0024', name: '노이준', department: '물류팀', position: '팀원', email: 'ijun.noh@jeil.local', status: 'locked' },
    ],
  } satisfies AccountManagementMock,
  accountPersonalInfoSettings: {
    employeeNoPrefix: 'JEIL',
    employeeNoLength: 8,
    employeeNoResetMonth: 'none',
    initialPasswordRule: 'employee-no-phone',
    initialPasswordLength: 8,
    requirePasswordChange: true,
    maskSensitiveInfo: true,
  } satisfies AccountPersonalInfoSettingsMock,
  workplaceSettings: {
    statuses: [
      {
        id: 'normal',
        code: 'normal',
        label: '정상',
        color: '#2ba35d',
        description: '운영 중인 근무지',
        enabled: true,
        order: 1,
      },
      {
        id: 'closed',
        code: 'closed',
        label: '폐업',
        color: '#d62929',
        description: '운영이 종료된 근무지',
        enabled: true,
        order: 2,
      },
      {
        id: 'paused',
        code: 'paused',
        label: '휴업',
        color: '#e86d1f',
        description: '일시적으로 운영을 중단한 근무지',
        enabled: true,
        order: 3,
      },
      {
        id: 'preparing',
        code: 'preparing',
        label: '준비',
        color: '#2289b6',
        description: '운영 시작 전 준비 중인 근무지',
        enabled: true,
        order: 4,
      },
    ],
    defaultStatusId: 'normal',
    showDisabledStatuses: false,
  } satisfies WorkplaceSettingsMock,
  notices: [
    {
      id: 'notice-001',
      title: '5월 정기 점검 일정 안내',
      category: '점검',
      createdAt: '2026-05-06',
    },
    {
      id: 'notice-002',
      title: '관리자 권한 변경 요청 처리 기준',
      category: '운영',
      createdAt: '2026-05-05',
    },
    {
      id: 'notice-003',
      title: '현장 근태 입력 마감 시간 변경',
      category: '근태',
      createdAt: '2026-05-04',
    },
    {
      id: 'notice-004',
      title: '공지사항 등록 양식 개편 안내',
      category: '공지',
      createdAt: '2026-05-03',
    },
    {
      id: 'notice-005',
      title: '임직원 정보 수정 승인 절차 안내',
      category: '인사',
      createdAt: '2026-05-02',
    },
    {
      id: 'notice-006',
      title: '5월 휴무 신청 마감 안내',
      category: '인사',
      createdAt: '2026-05-01',
    },
    {
      id: 'notice-007',
      title: '근무지 QR 인증 정책 적용 안내',
      category: '근태',
      createdAt: '2026-04-30',
    },
    {
      id: 'notice-008',
      title: '푸시 발송 예약 기능 점검 안내',
      category: '점검',
      createdAt: '2026-04-29',
    },
    {
      id: 'notice-009',
      title: '운영 관리자 계정 보안 점검 요청',
      category: '운영',
      createdAt: '2026-04-28',
    },
    {
      id: 'notice-010',
      title: '공지 노출 순서 기준 안내',
      category: '공지',
      createdAt: '2026-04-27',
    },
    {
      id: 'notice-011',
      title: '월간 근무 일정 확인 요청',
      category: '근태',
      createdAt: '2026-04-26',
    },
    {
      id: 'notice-012',
      title: '신규 입직원 등록 절차 안내',
      category: '인사',
      createdAt: '2026-04-25',
    },
    {
      id: 'notice-013',
      title: '관리자 페이지 임시 점검 완료 안내',
      category: '점검',
      createdAt: '2026-04-24',
    },
    {
      id: 'notice-014',
      title: '지점별 근태 현황 확인 기준 안내',
      category: '운영',
      createdAt: '2026-04-23',
    },
    {
      id: 'notice-015',
      title: '휴가 일정표 반영 시간 안내',
      category: '인사',
      createdAt: '2026-04-22',
    },
    {
      id: 'notice-016',
      title: '미등록 근태 처리 기준 안내',
      category: '근태',
      createdAt: '2026-04-21',
    },
    {
      id: 'notice-017',
      title: '운영 공지 작성 권한 변경 안내',
      category: '운영',
      createdAt: '2026-04-20',
    },
    {
      id: 'notice-018',
      title: '푸시 알림 수신 상태 확인 안내',
      category: '공지',
      createdAt: '2026-04-19',
    },
    {
      id: 'notice-019',
      title: '주말 근무 배정 입력 안내',
      category: '근태',
      createdAt: '2026-04-18',
    },
    {
      id: 'notice-020',
      title: '관리자 메뉴 접근 권한 안내',
      category: '운영',
      createdAt: '2026-04-17',
    },
    {
      id: 'notice-021',
      title: '조직도 정보 최신화 요청',
      category: '인사',
      createdAt: '2026-04-16',
    },
    {
      id: 'notice-022',
      title: '정기 데이터 백업 안내',
      category: '점검',
      createdAt: '2026-04-15',
    },
    {
      id: 'notice-023',
      title: '근무지 정보 등록 기준 안내',
      category: '운영',
      createdAt: '2026-04-14',
    },
    {
      id: 'notice-024',
      title: '임직원 앱 공지 노출 테스트 안내',
      category: '공지',
      createdAt: '2026-04-13',
    },
  ] satisfies NoticeMock[],
  notifications: [
    {
      id: 'notification-001',
      title: '미등록 근태 5건이 확인되었습니다',
      category: '근태',
      createdAt: '2026.05.04',
    },
    {
      id: 'notification-002',
      title: '신규 공지 승인 요청이 도착했습니다',
      category: '승인',
      createdAt: '2026.05.04',
    },
    {
      id: 'notification-003',
      title: '푸시 발송 예약 시간이 30분 남았습니다',
      category: '푸시',
      createdAt: '2026.05.04',
    },
    {
      id: 'notification-004',
      title: '연차 신청 3건이 검토 대기 중입니다',
      category: '휴가',
      createdAt: '2026.05.03',
    },
    {
      id: 'notification-005',
      title: '임직원 정보 수정 요청이 접수되었습니다',
      category: '인사',
      createdAt: '2026.05.03',
    },
  ] satisfies HomeNotificationMock[],
  attendanceSummary: {
    total: 128,
    present: 104,
    late: 7,
    unregistered: 5,
    absent: 3,
    vacation: 12,
  } satisfies AttendanceSummaryMock,
  attendanceDaily: {
    date: '2026-05-04',
    rows: [
      {
        id: 'daily-001',
        employeeNo: '0000-0001',
        name: '김민준',
        department: '운영팀',
        position: '매니저',
        workplace: '본사',
        status: 'present',
        schedule: '09:00 - 18:00',
        checkIn: '08:54',
        checkOut: '18:03',
        workHours: '8시간 9분',
        note: '정상',
      },
      {
        id: 'daily-002',
        employeeNo: '0000-0002',
        name: '이서연',
        department: '운영팀',
        position: '팀원',
        workplace: '본사',
        status: 'late',
        schedule: '09:00 - 18:00',
        checkIn: '09:18',
        checkOut: '18:05',
        workHours: '7시간 47분',
        note: '18분 지각',
      },
      {
        id: 'daily-003',
        employeeNo: '0000-0003',
        name: '박지호',
        department: '시설팀',
        position: '팀원',
        workplace: '2공장',
        status: 'present',
        schedule: '08:30 - 17:30',
        checkIn: '08:22',
        checkOut: '17:31',
        workHours: '8시간 9분',
        note: '정상',
      },
      {
        id: 'daily-004',
        employeeNo: '0000-0004',
        name: '최하윤',
        department: '인사팀',
        position: '팀장',
        workplace: '본사',
        status: 'vacation',
        schedule: '09:00 - 18:00',
        checkIn: '-',
        checkOut: '-',
        workHours: '-',
        note: '연차',
      },
      {
        id: 'daily-005',
        employeeNo: '0000-0005',
        name: '정도윤',
        department: '물류팀',
        position: '팀원',
        workplace: '물류센터',
        status: 'unregistered',
        schedule: '10:00 - 19:00',
        checkIn: '-',
        checkOut: '-',
        workHours: '-',
        note: '출근 미등록',
      },
      {
        id: 'daily-006',
        employeeNo: '0000-0006',
        name: '강서준',
        department: '시설팀',
        position: '파트장',
        workplace: '1공장',
        status: 'present',
        schedule: '08:30 - 17:30',
        checkIn: '08:29',
        checkOut: '17:35',
        workHours: '8시간 6분',
        note: '정상',
      },
      {
        id: 'daily-007',
        employeeNo: '0000-0007',
        name: '한지우',
        department: '영업팀',
        position: '팀원',
        workplace: '강남지점',
        status: 'absent',
        schedule: '09:30 - 18:30',
        checkIn: '-',
        checkOut: '-',
        workHours: '-',
        note: '결근',
      },
      {
        id: 'daily-008',
        employeeNo: '0000-0008',
        name: '오유진',
        department: '영업팀',
        position: '팀원',
        workplace: '강남지점',
        status: 'present',
        schedule: '09:30 - 18:30',
        checkIn: '09:22',
        checkOut: '18:36',
        workHours: '8시간 14분',
        note: '정상',
      },
      {
        id: 'daily-009',
        employeeNo: '0000-0009',
        name: '윤태양',
        department: '물류팀',
        position: '팀장',
        workplace: '물류센터',
        status: 'late',
        schedule: '10:00 - 19:00',
        checkIn: '10:11',
        checkOut: '19:04',
        workHours: '7시간 53분',
        note: '11분 지각',
      },
      {
        id: 'daily-010',
        employeeNo: '0000-0010',
        name: '임수아',
        department: '인사팀',
        position: '팀원',
        workplace: '본사',
        status: 'present',
        schedule: '09:00 - 18:00',
        checkIn: '08:57',
        checkOut: '18:00',
        workHours: '8시간 3분',
        note: '정상',
      },
      {
        id: 'daily-011',
        employeeNo: '0000-0011',
        name: '서준호',
        department: '운영팀',
        position: '팀원',
        workplace: '1공장',
        status: 'unregistered',
        schedule: '08:30 - 17:30',
        checkIn: '-',
        checkOut: '-',
        workHours: '-',
        note: '출근 미등록',
      },
      {
        id: 'daily-012',
        employeeNo: '0000-0012',
        name: '문채원',
        department: '시설팀',
        position: '팀원',
        workplace: '2공장',
        status: 'present',
        schedule: '08:30 - 17:30',
        checkIn: '08:24',
        checkOut: '17:27',
        workHours: '8시간 3분',
        note: '정상',
      },
    ] satisfies AttendanceDailyEmployeeMock[],
  },
  worksiteAttendance: {
    date: '2026-05-04',
    regions: createWorksiteAttendanceRegions(worksiteAttendanceStores),
    workplaces: createWorksiteAttendanceWorkplaces(worksiteAttendanceStores),
  },
  monthlyWorkforce: {
    defaultCount: 100,
    overrides: {
      '2026-05-01': 92,
      '2026-05-02': 64,
      '2026-05-03': 48,
      '2026-05-04': 118,
      '2026-05-05': 42,
      '2026-05-08': 110,
      '2026-05-12': 106,
      '2026-05-15': 122,
      '2026-05-18': 116,
      '2026-05-25': 58,
      '2026-05-29': 104,
    } as Record<string, number>,
  } satisfies MonthlyWorkforceMock,
  publicHolidays: [
    { date: '2026-05-05', label: '어린이날' },
    { date: '2026-05-25', label: '대체공휴일' },
  ] satisfies PublicHolidayMock[],
};
