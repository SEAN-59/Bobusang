"use client";

import { useState } from "react";

import { Button, Card, Icon } from "@/components";

import styles from "../versions/versions.module.css";
import localStyles from "./holidays.module.css";

type Holiday = {
  date: string;
  name: string;
  type: "public" | "substitute";
};

const holidays: Holiday[] = [
  { date: "2026-05-05", name: "어린이날", type: "public" },
  { date: "2026-05-24", name: "부처님 오신 날", type: "public" },
  { date: "2026-05-25", name: "대체 휴일", type: "substitute" },
  { date: "2026-06-06", name: "현충일", type: "public" },
];

const weekdays = ["일", "월", "화", "수", "목", "금", "토"] as const;

export function HolidaysClient() {
  const [displayMonth, setDisplayMonth] = useState(() => startOfMonth(new Date()));

  const moveMonth = (amount: number) => {
    setDisplayMonth((current) => new Date(Date.UTC(current.getUTCFullYear(), current.getUTCMonth() + amount, 1)));
  };

  const moveToDateMonth = (date: string) => {
    setDisplayMonth(monthFromDateKey(date));
  };

  return (
    <section className={styles.bodyStack} aria-label="휴일 관리 작업">
      <Card className={styles.summaryCard} aria-label="휴일 관리 작업">
        <div>
          <h2>휴일 관리</h2>
          <p>서비스 운영에 필요한 휴일 일정을 확인합니다.</p>
        </div>
      </Card>

      <section className={localStyles.holidayGrid} aria-label="휴일 관리 본문">
        <CalendarCard
          holidays={holidays}
          monthDate={displayMonth}
          onMoveMonth={moveMonth}
          onMoveToMonth={moveToDateMonth}
          onToday={() => setDisplayMonth(startOfMonth(new Date()))}
        />

        <Card className={localStyles.listCard} aria-label="달력 리스트">
          <div className={localStyles.cardHeader}>
            <h2>달력 리스트</h2>
            <span>총 {holidays.length}건</span>
          </div>
          <ul className={localStyles.holidayList}>
            {holidays.map((holiday) => (
              <li className={localStyles.holidayItem} key={holiday.date}>
                <time className={localStyles.holidayDate} dateTime={holiday.date}>
                  {formatDateLabel(holiday.date)}
                </time>
                <div>
                  <strong>{holiday.name}</strong>
                  <span>{holiday.type === "substitute" ? "대체 휴일" : "공휴일"}</span>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </section>
  );
}

function CalendarCard({
  holidays: holidayItems,
  monthDate,
  onMoveMonth,
  onMoveToMonth,
  onToday,
}: {
  holidays: Holiday[];
  monthDate: Date;
  onMoveMonth: (amount: number) => void;
  onMoveToMonth: (date: string) => void;
  onToday: () => void;
}) {
  const year = monthDate.getUTCFullYear();
  const month = monthDate.getUTCMonth();
  const title = `${year}년 ${month + 1}월`;
  const days = buildCalendarDays(year, month);
  const holidayMap = new Map(holidayItems.map((holiday) => [holiday.date, holiday]));
  const todayKey = toLocalDateKey(new Date());

  return (
    <Card className={localStyles.calendarCard} aria-label={`${title} 달력`}>
      <div className={localStyles.cardHeader}>
        <h2>{title}</h2>
        <div className={localStyles.monthActions}>
          <Button aria-label="이전 달" className={localStyles.monthButton} onClick={() => onMoveMonth(-1)} size="sm" variant="secondary">
            <Icon name="chevronBackward" size={16} />
          </Button>
          <Button className={localStyles.todayButton} onClick={onToday} size="sm" variant="secondary">
            오늘
          </Button>
          <Button aria-label="다음 달" className={localStyles.monthButton} onClick={() => onMoveMonth(1)} size="sm" variant="secondary">
            <Icon name="chevronForward" size={16} />
          </Button>
        </div>
      </div>
      <div className={localStyles.weekdayGrid} aria-hidden="true">
        {weekdays.map((weekday, index) => (
          <span
            className={[
              localStyles.weekday,
              index === 0 ? localStyles.sundayText : "",
              index === 6 ? localStyles.saturdayText : "",
            ].filter(Boolean).join(" ")}
            key={weekday}
          >
            {weekday}
          </span>
        ))}
      </div>
      <div className={localStyles.dayGrid}>
        {days.map((day, index) => {
          if (!day) {
            return <span className={localStyles.emptyDay} key={`empty-${index}`} />;
          }

          const holiday = day.isCurrentMonth ? holidayMap.get(day.date) : undefined;
          const className = [
            localStyles.dayCell,
            day.isCurrentMonth && day.weekday === 0 ? localStyles.sundayText : "",
            day.isCurrentMonth && day.weekday === 6 ? localStyles.saturdayText : "",
            holiday ? localStyles.holidayDay : "",
            day.date === todayKey ? localStyles.todayDay : "",
            !day.isCurrentMonth ? localStyles.outMonthDay : "",
          ].filter(Boolean).join(" ");

          const dayContent = (
            <>
              <span>{day.day}</span>
              {holiday ? <small>{holiday.name}</small> : null}
            </>
          );

          if (!day.isCurrentMonth) {
            return (
              <button
                aria-label={`${day.date} 달로 이동`}
                className={className}
                key={day.date}
                onClick={() => onMoveToMonth(day.date)}
                title={`${day.date} 달로 이동`}
                type="button"
              >
                {dayContent}
              </button>
            );
          }

          return (
            <span className={className} key={day.date} title={holiday?.name}>
              {dayContent}
            </span>
          );
        })}
      </div>
    </Card>
  );
}

function buildCalendarDays(year: number, month: number) {
  const firstDate = new Date(Date.UTC(year, month, 1));
  const lastDate = new Date(Date.UTC(year, month + 1, 0));
  const days: Array<{ date: string; day: number; isCurrentMonth: boolean; weekday: number }> = [];
  const firstWeekday = firstDate.getUTCDay();
  const startOffset = firstWeekday === 0 ? 7 : firstWeekday;

  for (let index = startOffset; index > 0; index -= 1) {
    const date = new Date(Date.UTC(year, month, 1 - index));
    days.push({
      date: toDateKey(date),
      day: date.getUTCDate(),
      isCurrentMonth: false,
      weekday: date.getUTCDay(),
    });
  }

  for (let day = 1; day <= lastDate.getUTCDate(); day += 1) {
    const date = new Date(Date.UTC(year, month, day));
    days.push({
      date: toDateKey(date),
      day,
      isCurrentMonth: true,
      weekday: date.getUTCDay(),
    });
  }

  let nextMonthDay = 1;
  while (days.length < 42) {
    const date = new Date(Date.UTC(year, month + 1, nextMonthDay));
    days.push({
      date: toDateKey(date),
      day: date.getUTCDate(),
      isCurrentMonth: false,
      weekday: date.getUTCDay(),
    });
    nextMonthDay += 1;
  }

  return days;
}

function startOfMonth(date: Date) {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1));
}

function monthFromDateKey(date: string) {
  const [year, month] = date.split("-").map(Number);

  return new Date(Date.UTC(year, month - 1, 1));
}

function formatDateLabel(date: string) {
  const [, month, day] = date.split("-");

  return `${month}. ${day}`;
}

function toDateKey(date: Date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function toLocalDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
