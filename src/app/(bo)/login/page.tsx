import type { Metadata } from "next";
import Image from "next/image";

import loginLogo from "@/assets/image/login_logo.png";
import { LoginForm } from "./_components/login-form";
import styles from "./login.module.css";

export const metadata: Metadata = {
  title: "Bobusang 로그인",
};

export default function LoginPage() {
  return (
    <main className={styles.page}>
      <section className={styles.brandPanel} aria-label="Bobusang 소개">
        <div className={styles.brandContent}>
          <Image
            src={loginLogo}
            alt="Bobusang"
            className={styles.brandLogo}
            priority
          />
          <h1 className={styles.brandTitle}>
            <span className={styles.brandTitleLine}>필요할 때 찾아오는</span>
            <span className={styles.brandTitleLine}>작은 보부상</span>
          </h1>
          <p className={styles.brandDescription}>
            필요한 값을 챙겨두고, 필요한 곳에 바로 전하는 곳
          </p>
        </div>
      </section>

      <section className={styles.loginPanel} aria-label="로그인">
        <LoginForm />
      </section>
    </main>
  );
}
