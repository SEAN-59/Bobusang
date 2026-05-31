"use client";

import { useState } from "react";

import { Badge } from "@/components/badge/badge";
import { Breadcrumb } from "@/components/breadcrumb/breadcrumb";
import { Button } from "@/components/button/button";
import { Card, CardDescription, CardFooter, CardTitle } from "@/components/card/card";
import {
  CardCheckbox,
  CardRadio,
  Checkbox,
  IndeterminateCheckbox,
  Radio,
} from "@/components/checkbox-radio/checkbox-radio";
import { Dropdown, DropdownDivider, DropdownItem, DropdownSectionLabel } from "@/components/dropdown/dropdown";
import { EmptyState } from "@/components/empty-state/empty-state";
import {
  CurrencyInputDemo,
  CustomSelectDemo,
  DateInputDemo,
  FileDropDemo,
  FormDemo,
  FormGroup,
  PhoneInputDemo,
  SearchInputDemo,
  TextareaCounter,
  TextInput,
} from "@/components/form/form";
import { Icon } from "@/components/icon/icon";
import {
  BottomSheet,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  SheetBody,
  SheetHeader,
  SideDrawer,
} from "@/components/modal-dialog/modal-dialog";
import {
  MobileHamburgerNavigationPreview,
  MixedNavigationPreview,
  SidebarNavigationPreview,
  TopbarNavigationPreview,
} from "@/components/navigation/navigation";
import { PaginationDemo } from "@/components/pagination/pagination";
import { SkeletonCard } from "@/components/skeleton-loading/skeleton-loading";
import { SlidingTabs, VerticalTabs } from "@/components/tabs/tabs";
import { DropdownSortTableDemo, EmptyTableDemo, SortableTableDemo } from "@/components/table/table";
import { StaticToast, useToast } from "@/components/toast-snackbar/toast-snackbar";
import { ButtonToggle, SegmentedToggle, Switch } from "@/components/toggle-switch/toggle-switch";
import { Tooltip } from "@/components/tooltip/tooltip";

const tabItems = [
  { content: <MutedText>개요 탭 콘텐츠입니다.</MutedText>, label: "개요" },
  { content: <MutedText>상세 정보 탭 콘텐츠입니다.</MutedText>, label: "상세 정보" },
  { content: <MutedText>히스토리 탭 콘텐츠입니다.</MutedText>, label: "히스토리" },
  { content: <MutedText>설정 탭 콘텐츠입니다.</MutedText>, label: "설정" },
];

export function ComponentsPreview() {
  return (
    <>
      <NavigationSection />
      <ButtonSection />
      <BadgeSection />
      <CardSection />
      <CheckboxRadioSection />
      <ToggleSection />
      <TabsSection />
      <TableSection />
      <BreadcrumbSection />
      <PaginationSection />
      <DropdownSection />
      <TooltipSection />
      <ModalSection />
      <ToastSection />
      <SkeletonSection />
      <EmptySection />
      <FormSection />
    </>
  );
}

function NavigationSection() {
  return (
    <>
      <section className="gl-section" id="s-topbar">
        <NavigationHeader
          description="블로그, 마케팅 페이지 등 콘텐츠 중심 서비스에 적합. 메뉴 5개 이하 권장."
          title="Topbar"
        />
        <Preview label="Live Preview" noPad>
          <TopbarNavigationPreview />
        </Preview>
      </section>
      <section className="gl-section" id="s-sidebar">
        <NavigationHeader
          description="대시보드·어드민 서비스에 적합. 메뉴 그룹핑이 필요할 때 사용."
          title="Sidebar"
        />
        <Preview label="Live Preview" noPad>
          <SidebarNavigationPreview />
        </Preview>
      </section>
      <section className="gl-section" id="s-mixed">
        <NavigationHeader
          description="여러 제품군을 가진 서비스에 적합. Topbar는 제품 전환, Sidebar는 제품 내 메뉴."
          title="Topbar + Sidebar"
        />
        <Preview label="Live Preview" noPad>
          <MixedNavigationPreview />
        </Preview>
      </section>
      <section className="gl-section" id="s-mobile">
        <NavigationHeader
          description="모바일 뷰에서 Topbar/Sidebar 모두 Hamburger Drawer로 전환됩니다."
          title="Mobile Hamburger"
        />
        <Preview label="Live Preview — 햄버거 버튼 클릭" noPad>
          <MobileHamburgerNavigationPreview />
        </Preview>
      </section>
    </>
  );
}

function ButtonSection() {
  const { showToast } = useToast();
  const notify = (label: string) => showToast("info", "버튼 클릭", `${label} 버튼을 눌렀습니다.`);

  return (
    <section className="gl-section" id="s-button">
      <SectionHeader title="Button" />
      <Preview label="Variant">
        <div className="comp-row">
          <Button onClick={() => notify("Primary")}>Primary</Button>
          <Button onClick={() => notify("Secondary")} variant="secondary">Secondary</Button>
          <Button onClick={() => notify("Ghost")} variant="ghost">Ghost</Button>
          <Button onClick={() => notify("Danger")} variant="danger">Danger</Button>
        </div>
      </Preview>
      <Preview label="Size">
        <div className="comp-row">
          <Button onClick={() => notify("Small")} size="sm">Small</Button>
          <Button onClick={() => notify("Medium")} size="md">Medium</Button>
          <Button onClick={() => notify("Large")} size="lg">Large</Button>
        </div>
      </Preview>
      <Preview label="Interaction State">
        <div className="comp-row">
          <Button>Default</Button>
          <Button className="is-hover">Hover</Button>
          <Button className="is-pressed">Pressed</Button>
          <Button className="is-focus">Focus</Button>
          <Button isLoading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Preview>
      <Preview label="Full Width">
        <Button block onClick={() => notify("Full width")}>Full width action</Button>
      </Preview>
    </section>
  );
}

function BadgeSection() {
  return (
    <section className="gl-section" id="s-badge">
      <SectionHeader title="Badge" />
      <Preview label="Variant">
        <div className="comp-row">
          <Badge>Accent</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="neutral">Neutral</Badge>
        </div>
      </Preview>
    </section>
  );
}

function CardSection() {
  return (
    <section className="gl-section" id="s-card">
      <SectionHeader title="Card" />
      <Preview gray label="Pattern">
        <div style={{ display: "grid", gap: "var(--space-4)", gridTemplateColumns: "repeat(3, 1fr)" }}>
          <Card>
            <CardTitle>기본 카드</CardTitle>
            <CardDescription>카드 내부 설명 텍스트입니다. 일반적인 콘텐츠 컨테이너로 사용됩니다.</CardDescription>
            <CardFooter><Button size="sm" variant="ghost">취소</Button><Button size="sm">확인</Button></CardFooter>
          </Card>
          <Card>
            <Badge style={{ alignSelf: "flex-start", marginBottom: "var(--space-2)" }} variant="success">Active</Badge>
            <CardTitle>뱃지 포함 카드</CardTitle>
            <CardDescription>뱃지는 타이틀 위에 배치하고 좌측 정렬을 맞춥니다.</CardDescription>
            <CardFooter><Button size="sm" variant="ghost">취소</Button><Button size="sm">확인</Button></CardFooter>
          </Card>
          <Card className="card-image">
            <div className="card-img-wrap"><ImagePlaceholder /></div>
            <div className="card-body">
              <CardTitle>이미지 카드</CardTitle>
              <CardDescription>상단 이미지가 16:9 비율로 카드 너비에 꽉 채워집니다.</CardDescription>
              <CardFooter><Button size="sm" variant="ghost">취소</Button><Button size="sm">확인</Button></CardFooter>
            </div>
          </Card>
          <Card className="card-image">
            <div className="card-img-wrap">
              <ImagePlaceholder />
              <Badge className="card-img-badge">New</Badge>
            </div>
            <div className="card-body">
              <CardTitle>이미지 + 뱃지 카드</CardTitle>
              <CardDescription>이미지 위에 뱃지를 오버레이로 올릴 수도 있습니다.</CardDescription>
              <CardFooter><Button size="sm" variant="ghost">취소</Button><Button size="sm">확인</Button></CardFooter>
            </div>
          </Card>
        </div>
      </Preview>
    </section>
  );
}

function CheckboxRadioSection() {
  return (
    <section className="gl-section" id="s-checkbox">
      <SectionHeader title="Checkbox & Radio" />
      <Preview label="Checkbox">
        <div className="check-group">
          <Checkbox defaultChecked>선택됨 (Checked)</Checkbox>
          <Checkbox>미선택 (Unchecked)</Checkbox>
          <Checkbox disabled>비활성 (Disabled)</Checkbox>
          <Checkbox defaultChecked disabled>비활성 선택됨</Checkbox>
        </div>
      </Preview>
      <Preview label="Indeterminate (중간 상태)">
        <div className="check-group">
          <IndeterminateCheckbox>일부 선택됨 (Indeterminate)</IndeterminateCheckbox>
          <IndeterminateCheckbox disabled>비활성 중간 상태</IndeterminateCheckbox>
        </div>
      </Preview>
      <Preview label="Radio">
        <div className="check-group">
          <Radio defaultChecked name="r1">옵션 A</Radio>
          <Radio name="r1">옵션 B</Radio>
          <Radio name="r1">옵션 C</Radio>
          <Radio disabled name="r2">비활성</Radio>
        </div>
      </Preview>
      <Preview gray label="카드형 (선택 시 테두리 강조)">
        <div style={{ display: "grid", gap: "var(--space-3)", gridTemplateColumns: "repeat(3, 1fr)" }}>
          <CardCheckbox defaultChecked><CardChoice icon="iOS" title="iOS / APNs" desc="Apple 푸시 알림" /></CardCheckbox>
          <CardCheckbox><CardChoice icon="AOS" title="Android / FCM" desc="Firebase 클라우드 메시지" /></CardCheckbox>
          <CardCheckbox disabled><CardChoice icon="Web" title="Web Push" desc="브라우저 웹 푸시" /></CardCheckbox>
        </div>
        <div style={{ background: "var(--color-border)", height: 1, margin: "var(--space-5) 0" }} />
        <div style={{ display: "grid", gap: "var(--space-3)", gridTemplateColumns: "repeat(2, 1fr)" }}>
          <CardRadio defaultChecked name="billing"><CardChoice title="월간 결제" desc="매월 자동 결제" price="₩9,900" /></CardRadio>
          <CardRadio name="billing"><CardChoice title="연간 결제" desc="2개월 무료" price="₩99,000" /></CardRadio>
        </div>
      </Preview>
      <Preview label="수평 배열">
        <div className="check-group-horizontal">
          <Checkbox defaultChecked>iOS</Checkbox>
          <Checkbox defaultChecked>Android</Checkbox>
          <Checkbox>Web</Checkbox>
        </div>
      </Preview>
    </section>
  );
}

function ToggleSection() {
  return (
    <section className="gl-section" id="s-toggle">
      <SectionHeader title="Toggle / Switch" />
      <Preview label="States">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <Switch defaultChecked label="활성화 (On)" />
          <Switch label="비활성화 (Off)" />
          <Switch disabled label="비활성 (Disabled)" />
        </div>
      </Preview>
      <Preview label="Button Toggle">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
          <div>
            <MutedLabel>단일 버튼</MutedLabel>
            <div style={{ alignItems: "center", display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
              <ButtonToggle defaultActive dot>알림 활성화</ButtonToggle>
              <ButtonToggle dot>다크 모드</ButtonToggle>
              <ButtonToggle defaultActive disabled dot>비활성 (On)</ButtonToggle>
              <ButtonToggle disabled dot>비활성 (Off)</ButtonToggle>
            </div>
          </div>
          <div>
            <MutedLabel>그룹 (단일 선택)</MutedLabel>
            <SegmentedToggle items={["전체", "iOS", "Android", "Web"]} />
          </div>
          <div>
            <MutedLabel>그룹 (다중 선택)</MutedLabel>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
              <ButtonToggle defaultActive>푸시 알림</ButtonToggle>
              <ButtonToggle defaultActive>이메일</ButtonToggle>
              <ButtonToggle>SMS</ButtonToggle>
              <ButtonToggle>카카오톡</ButtonToggle>
            </div>
          </div>
        </div>
      </Preview>
    </section>
  );
}

function TabsSection() {
  return (
    <section className="gl-section" id="s-tabs">
      <SectionHeader title="Tabs" />
      <Preview label="Underline - 슬라이딩 애니메이션">
        <SlidingTabs items={tabItems} />
      </Preview>
      <Preview label="아이콘 + 텍스트">
        <SlidingTabs
          items={[
            { content: <MutedText>개요 탭 콘텐츠입니다.</MutedText>, icon: <GridIcon />, label: "개요" },
            { content: <MutedText>히스토리 탭 콘텐츠입니다.</MutedText>, icon: <ClockIcon />, label: "히스토리" },
            { content: <MutedText>통계 탭 콘텐츠입니다.</MutedText>, icon: <ClockIcon />, label: "통계" },
            { content: <MutedText>계정 탭 콘텐츠입니다.</MutedText>, icon: <UserIcon />, label: "계정" },
          ]}
        />
      </Preview>
      <Preview label="수직 탭 (Vertical)" noPad>
        <VerticalTabs items={tabItems} />
      </Preview>
    </section>
  );
}

function TableSection() {
  return (
    <section className="gl-section" id="s-table">
      <SectionHeader title="Table" />
      <div className="preview">
        <div className="preview-label">정렬 1 · 헤더 클릭 오름/내림차순 · 행 선택 · 페이지네이션</div>
        <SortableTableDemo />
      </div>
      <Preview label="정렬 2 · 타이틀 선택 드롭다운" noPad>
        <DropdownSortTableDemo />
      </Preview>
      <Preview label="Empty State 연동" noPad>
        <EmptyTableDemo />
      </Preview>
    </section>
  );
}

function BreadcrumbSection() {
  return (
    <section className="gl-section" id="s-breadcrumb">
      <SectionHeader title="Breadcrumb" />
      <Preview label="Default">
        <div className="comp-col">
          <Breadcrumb items={[{ label: "홈" }, { label: "서비스" }, { current: true, label: "SPMS iOS" }]} />
          <Breadcrumb
            items={[{ label: "Console" }, { label: "설정" }, { label: "웹훅" }, { current: true, label: "새 웹훅 추가" }]}
            separator={<Icon name="chevronForward" size={12} />}
          />
        </div>
      </Preview>
    </section>
  );
}

function PaginationSection() {
  return (
    <section className="gl-section" id="s-pagination">
      <SectionHeader title="Pagination" />
      <Preview label="Live Demo - 버튼을 클릭하세요">
        <div className="comp-col" style={{ gap: "var(--space-6)" }}>
          <div>
            <MutedLabel>페이지 수 적을 때 (5개 이하)</MutedLabel>
            <PaginationDemo total={5} />
          </div>
          <div>
            <MutedLabel>페이지 수 많을 때 (100페이지)</MutedLabel>
            <PaginationDemo total={100} />
          </div>
        </div>
      </Preview>
    </section>
  );
}

function DropdownSection() {
  return (
    <section className="gl-section" id="s-dropdown">
      <SectionHeader title="Dropdown" />
      <Preview label="Live Preview - 버튼을 클릭하세요" style={{ minHeight: 220 }}>
        <div className="comp-row">
          <Dropdown label={<DropdownLabel>옵션 선택</DropdownLabel>}>
            <DropdownSectionLabel>계정</DropdownSectionLabel>
            <DropdownItem>프로필 편집</DropdownItem>
            <DropdownItem>설정</DropdownItem>
            <DropdownDivider />
            <DropdownSectionLabel>서비스</DropdownSectionLabel>
            <DropdownItem>새 서비스 추가</DropdownItem>
            <DropdownItem>내보내기</DropdownItem>
            <DropdownDivider />
            <DropdownItem danger>삭제</DropdownItem>
          </Dropdown>
          <Dropdown label={<DropdownLabel>액션</DropdownLabel>} triggerClassName="btn btn-md btn-primary">
            <DropdownItem>편집</DropdownItem>
            <DropdownItem>복제</DropdownItem>
            <DropdownDivider />
            <DropdownItem danger>삭제</DropdownItem>
          </Dropdown>
        </div>
      </Preview>
    </section>
  );
}

function TooltipSection() {
  return (
    <section className="gl-section" id="s-tooltip">
      <SectionHeader title="Tooltip" />
      <Preview label="Hover 해보세요" style={{ padding: "var(--space-10) var(--space-6)" }}>
        <div className="comp-row" style={{ justifyContent: "center" }}>
          <Tooltip message="이 항목을 영구 삭제합니다"><Button variant="secondary">삭제</Button></Tooltip>
          <Tooltip message="변경사항을 저장합니다"><Button>저장</Button></Tooltip>
          <Tooltip message="Pro 플랜 전용 기능입니다"><Badge style={{ cursor: "help" }}>Pro</Badge></Tooltip>
        </div>
      </Preview>
    </section>
  );
}

function ModalSection() {
  const [overlay, setOverlay] = useState<null | "basic" | "danger" | "scroll" | "sheet" | "drawer">(null);
  const close = () => setOverlay(null);

  return (
    <section className="gl-section" id="s-modal">
      <SectionHeader title="Modal / Dialog" />
      <Preview label="Live Preview - 버튼을 클릭하세요">
        <div className="comp-row">
          <Button onClick={() => setOverlay("basic")}>기본 모달</Button>
          <Button onClick={() => setOverlay("danger")} variant="danger">삭제 확인</Button>
          <Button onClick={() => setOverlay("scroll")} variant="secondary">스크롤 모달</Button>
          <Button onClick={() => setOverlay("sheet")} variant="secondary">하단 시트</Button>
          <Button onClick={() => setOverlay("drawer")} variant="secondary">사이드 드로어</Button>
        </div>
      </Preview>
      <Modal isOpen={overlay === "basic"} onClose={close}>
        <ModalHeader onClose={close}>기본 모달</ModalHeader>
        <ModalBody><p>작업 내용을 확인하고 계속 진행할 수 있습니다.</p></ModalBody>
        <ModalFooter><Button onClick={close} variant="ghost">취소</Button><Button onClick={close}>확인</Button></ModalFooter>
      </Modal>
      <Modal isOpen={overlay === "danger"} onClose={close}>
        <ModalHeader onClose={close}>삭제 확인</ModalHeader>
        <ModalBody><p>선택한 항목은 삭제 후 복구할 수 없습니다.</p></ModalBody>
        <ModalFooter><Button onClick={close} variant="ghost">취소</Button><Button onClick={close} variant="danger">삭제</Button></ModalFooter>
      </Modal>
      <Modal isOpen={overlay === "scroll"} onClose={close}>
        <ModalHeader onClose={close}>스크롤 모달</ModalHeader>
        <ModalBody scroll>
          {Array.from({ length: 8 }, (_, index) => (
            <p key={index} style={{ marginBottom: "var(--space-3)" }}>긴 내용을 담는 모달 본문입니다. 내부 영역만 스크롤됩니다.</p>
          ))}
        </ModalBody>
        <ModalFooter><Button onClick={close}>확인</Button></ModalFooter>
      </Modal>
      <BottomSheet isOpen={overlay === "sheet"} onClose={close}>
        <SheetHeader onClose={close}>하단 시트</SheetHeader>
        <SheetBody><p style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)", lineHeight: "var(--line-height-relaxed)" }}>모바일 선택지나 보조 액션을 보여줄 때 사용합니다.</p></SheetBody>
      </BottomSheet>
      <SideDrawer isOpen={overlay === "drawer"} onClose={close}>
        <DrawerHeader onClose={close}>사이드 드로어</DrawerHeader>
        <DrawerBody><p style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)", lineHeight: "var(--line-height-relaxed)" }}>상세 설정이나 보조 패널을 오른쪽에서 열어 확인합니다.</p></DrawerBody>
        <DrawerFooter><Button onClick={close} variant="ghost">취소</Button><Button onClick={close}>저장</Button></DrawerFooter>
      </SideDrawer>
    </section>
  );
}

function ToastSection() {
  const { showToast } = useToast();

  return (
    <section className="gl-section" id="s-toast">
      <SectionHeader title="Toast / Snackbar" />
      <Preview label="Live Preview - 버튼을 클릭하세요">
        <div className="comp-row">
          <Button onClick={() => showToast("success", "저장 완료", "변경사항이 저장되었습니다.")} size="sm" variant="secondary">Success</Button>
          <Button onClick={() => showToast("warning", "주의", "일부 항목을 확인하세요.")} size="sm" variant="secondary">Warning</Button>
          <Button onClick={() => showToast("danger", "오류", "저장에 실패했습니다.")} size="sm" variant="secondary">Danger</Button>
          <Button onClick={() => showToast("info", "안내", "새 업데이트가 있습니다.")} size="sm" variant="secondary">Info</Button>
        </div>
      </Preview>
      <Preview label="Preview (정적)">
        <div className="toast-demo-list">
          <StaticToast message="변경사항이 저장되었습니다." title="저장 완료" type="success" />
          <StaticToast message="일부 항목을 확인하세요." title="주의" type="warning" />
          <StaticToast message="저장에 실패했습니다." title="오류" type="danger" />
          <StaticToast message="새 업데이트가 있습니다." title="안내" type="info" />
        </div>
      </Preview>
    </section>
  );
}

function SkeletonSection() {
  return (
    <section className="gl-section" id="s-skeleton">
      <SectionHeader title="Skeleton / Loading" />
      <Preview gray label="Card Skeleton">
        <div style={{ display: "grid", gap: "var(--space-4)", gridTemplateColumns: "repeat(2, 1fr)" }}>
          <SkeletonCard />
          <SkeletonCard variant="profile" />
        </div>
      </Preview>
    </section>
  );
}

function EmptySection() {
  return (
    <section className="gl-section" id="s-empty">
      <SectionHeader title="Empty State" />
      <Preview gray label="Default">
        <EmptyState action={<Button>+ 서비스 추가</Button>} description="아직 등록된 서비스가 없습니다. 새 서비스를 추가하면 여기에 표시됩니다." icon={<Icon name="assignment" size={28} />} title="데이터가 없습니다" />
      </Preview>
      <Preview gray label="Search Empty">
        <EmptyState action={<Button variant="secondary">검색 초기화</Button>} description='"SPMS"에 대한 검색 결과를 찾을 수 없습니다. 다른 키워드로 검색해 보세요.' icon={<Icon name="search" size={28} />} title="검색 결과가 없습니다" />
      </Preview>
    </section>
  );
}

function FormSection() {
  return (
    <section className="gl-section" id="s-form">
      <div className="gl-section-header">
        <p className="gl-section-label">Component</p>
        <h2 className="gl-section-title">Form</h2>
        <p className="gl-section-desc">사용자 입력을 받는 모든 요소입니다. Checkbox·Radio·Toggle은 별도 섹션을 참고하세요.</p>
      </div>
      <div className="gl-sub">
        <p className="gl-sub-title">Text Input - States</p>
        <Preview label="기본 / 필수 / 오류 / 비활성">
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)", maxWidth: 400 }}>
            <FormGroup hint="입력에 대한 힌트 텍스트입니다." label="기본 입력"><TextInput placeholder="내용을 입력하세요" type="text" /></FormGroup>
            <FormGroup label="필수 항목" required><TextInput placeholder="필수 입력 항목입니다" type="text" /></FormGroup>
            <FormGroup label="오류 상태"><TextInput className="is-error" defaultValue="잘못된 값" type="text" /><p className="form-error">올바른 이메일 형식을 입력해주세요.</p></FormGroup>
            <FormGroup label="비활성"><TextInput defaultValue="수정할 수 없는 값" disabled type="text" /></FormGroup>
          </div>
        </Preview>
      </div>
      <div className="gl-sub">
        <p className="gl-sub-title">Error - Shake & Scroll to Field</p>
        <Preview gray label="Live Demo - 빈 칸으로 제출"><FormDemo /></Preview>
      </div>
      <div className="gl-sub">
        <p className="gl-sub-title">Textarea</p>
        <Preview label="글자 수 카운터 포함"><div style={{ maxWidth: 400 }}><TextareaCounter /></div></Preview>
        <Preview label="부모 컨테이너 안에서만 확장">
          <div className="textarea-boundary">
            <label className="form-label">제한 영역</label>
            <textarea className="input textarea textarea-resize-contained" placeholder="이 영역 안에서만 크기를 조절합니다." rows={3} />
          </div>
        </Preview>
      </div>
      <div className="gl-sub">
        <p className="gl-sub-title">Select</p>
        <Preview label="Custom Select (Dropdown 기반)">
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)", maxWidth: 400 }}>
            <FormGroup label="플랫폼 선택"><CustomSelectDemo /></FormGroup>
            <FormGroup label="비활성 Select"><button className="input custom-select-btn" disabled type="button"><span>iOS (APNs)</span></button></FormGroup>
            <FormGroup label="오류 상태"><CustomSelectDemo error /><p className="form-error">플랫폼을 선택해주세요.</p></FormGroup>
          </div>
        </Preview>
      </div>
      <div className="gl-sub">
        <p className="gl-sub-title">Search Input</p>
        <Preview label="검색창"><div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", maxWidth: 400 }}><SearchInputDemo /></div></Preview>
      </div>
      <div className="gl-sub">
        <p className="gl-sub-title">Input with Icon</p>
        <Preview label="좌측 / 우측 아이콘">
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", maxWidth: 400 }}>
            <CurrencyInputDemo />
            <PhoneInputDemo />
          </div>
        </Preview>
      </div>
      <div className="gl-sub">
        <p className="gl-sub-title">Input Group</p>
        <Preview label="버튼/텍스트 결합형">
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", maxWidth: 400 }}>
            <div className="input-group"><input className="input" placeholder="초대 코드를 입력하세요" type="text" /><button className="btn btn-md btn-primary input-group-btn" type="button">적용</button></div>
            <div className="input-group"><span className="input-group-addon">https://</span><input className="input" placeholder="your-domain.com" type="text" /></div>
            <div className="input-group"><span className="input-group-addon">@</span><input className="input" placeholder="username" type="text" /><span className="input-group-addon">.com</span></div>
          </div>
        </Preview>
      </div>
      <div className="gl-sub">
        <p className="gl-sub-title">Date Input</p>
        <Preview label="날짜 / 날짜 범위"><div style={{ maxWidth: 400 }}><DateInputDemo /></div></Preview>
      </div>
      <div className="gl-sub">
        <p className="gl-sub-title">File Upload</p>
        <Preview label="파일 첨부"><div style={{ maxWidth: 400 }}><FileDropDemo /></div></Preview>
      </div>
    </section>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="gl-section-header">
      <p className="gl-section-label">Component</p>
      <h2 className="gl-section-title">{title}</h2>
    </div>
  );
}

function NavigationHeader({ description, title }: { description: string; title: string }) {
  return (
    <div className="gl-section-header">
      <p className="gl-section-label">Navigation</p>
      <h2 className="gl-section-title">{title}</h2>
      <p className="gl-section-desc">{description}</p>
    </div>
  );
}

function Preview({
  children,
  gray = false,
  label,
  noPad = false,
  style,
}: {
  children: React.ReactNode;
  gray?: boolean;
  label: string;
  noPad?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div className="preview">
      <div className="preview-label">{label}</div>
      <div className={["preview-body", gray ? "gray" : "", noPad ? "no-pad" : ""].filter(Boolean).join(" ")} style={style}>
        {children}
      </div>
    </div>
  );
}

function MutedText({ children }: { children: React.ReactNode }) {
  return <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)" }}>{children}</p>;
}

function MutedLabel({ children }: { children: React.ReactNode }) {
  return <p style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-xs)", marginBottom: "var(--space-3)" }}>{children}</p>;
}

function CardChoice({ desc, icon, price, title }: { desc: string; icon?: string; price?: string; title: string }) {
  return (
    <>
      {icon ? <div style={{ fontSize: 20, marginBottom: "var(--space-2)" }}>{icon}</div> : null}
      <span className="card-check-label">{title}</span>
      {price ? <span style={{ color: "var(--color-text-primary)", display: "block", fontSize: "var(--font-size-lg)", fontWeight: "var(--font-weight-bold)", margin: "var(--space-1) 0" }}>{price}</span> : null}
      <span className="card-check-desc">{desc}</span>
    </>
  );
}

function ImagePlaceholder() {
  return (
    <div className="card-img-placeholder">
      <Icon name="docs" size={32} />
    </div>
  );
}

function GridIcon() {
  return <Icon name="manageMenu" size={14} />;
}

function ClockIcon() {
  return <Icon name="clock" size={14} />;
}

function UserIcon() {
  return <Icon name="profile" size={14} />;
}

function DropdownLabel({ children }: { children: string }) {
  return (
    <>
      <span>{children}</span>
      <Icon name="arrowDown" size={14} />
    </>
  );
}
