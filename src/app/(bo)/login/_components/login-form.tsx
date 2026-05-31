"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useRef, useState } from "react";

import {
  Button,
  Checkbox,
  FormError,
  FormGroup,
  Icon,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextInput,
} from "@/components";

import styles from "../login.module.css";

type LoginErrors = {
  password: boolean;
  userId: boolean;
};

type ResetErrors = {
  email: boolean;
  name: boolean;
  userId: boolean;
};

const emptyErrors: LoginErrors = {
  password: false,
  userId: false,
};

const emptyResetErrors: ResetErrors = {
  email: false,
  name: false,
  userId: false,
};

const loginNavigationDelay = 1020;

export function LoginForm() {
  const router = useRouter();
  const userIdRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const resetUserIdRef = useRef<HTMLInputElement>(null);
  const resetNameRef = useRef<HTMLInputElement>(null);
  const resetEmailRef = useRef<HTMLInputElement>(null);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [resetUserId, setResetUserId] = useState("");
  const [resetName, setResetName] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [temporaryPassword, setTemporaryPassword] = useState("");
  const [isFindPasswordOpen, setIsFindPasswordOpen] = useState(false);
  const [isLoginSubmitting, setIsLoginSubmitting] = useState(false);
  const [isLoginTransitioning, setIsLoginTransitioning] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [errors, setErrors] = useState<LoginErrors>(emptyErrors);
  const [shakeFields, setShakeFields] = useState<LoginErrors>(emptyErrors);
  const [resetErrors, setResetErrors] = useState<ResetErrors>(emptyResetErrors);
  const [resetShakeFields, setResetShakeFields] = useState<ResetErrors>(emptyResetErrors);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoginSubmitting || isLoginTransitioning) return;
    setLoginMessage("");

    const nextErrors = {
      password: password.trim().length === 0,
      userId: userId.trim().length === 0,
    };

    setErrors(nextErrors);
    setShakeFields(emptyErrors);
    requestAnimationFrame(() => setShakeFields(nextErrors));

    const firstErrorRef = nextErrors.userId ? userIdRef : nextErrors.password ? passwordRef : null;
    if (firstErrorRef) {
      firstErrorRef.current?.focus();
      return;
    }

    setIsLoginSubmitting(true);

    let response: Response;

    try {
      response = await fetch("/api/auth/login", {
        body: JSON.stringify({ password, userId }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
    } catch {
      setIsLoginSubmitting(false);
      setLoginMessage("로그인 요청에 실패했습니다.");
      return;
    }

    setIsLoginSubmitting(false);

    if (!response.ok) {
      const result = await response.json().catch(() => null) as { message?: string } | null;
      setLoginMessage(result?.message ?? "아이디 또는 비밀번호를 확인해주세요.");
      return;
    }

    setIsLoginTransitioning(true);
    transitionTimerRef.current = setTimeout(() => {
      try {
        window.sessionStorage.setItem("bobusang:dashboard-reveal", "1");
      } catch {
        // Transition state is cosmetic; navigation should still continue.
      }

      router.replace("/dashboard");
    }, loginNavigationDelay);
  };

  const closeFindPassword = () => {
    setIsFindPasswordOpen(false);
  };

  const issueTemporaryPassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextResetErrors = {
      email: resetEmail.trim().length === 0,
      name: resetName.trim().length === 0,
      userId: resetUserId.trim().length === 0,
    };

    setResetErrors(nextResetErrors);
    setResetShakeFields(emptyResetErrors);
    requestAnimationFrame(() => setResetShakeFields(nextResetErrors));

    const firstErrorRef = nextResetErrors.userId
      ? resetUserIdRef
      : nextResetErrors.name
        ? resetNameRef
        : nextResetErrors.email
          ? resetEmailRef
          : null;

    if (firstErrorRef) {
      setTemporaryPassword("");
      firstErrorRef.current?.focus();
      return;
    }

    setTemporaryPassword(createTemporaryPassword());
  };

  return (
    <>
      <form className={styles.loginBox} noValidate onSubmit={submit}>
        <div className={styles.loginHeader}>
          <h2>로그인</h2>
        </div>

        <div className={styles.fieldStack}>
          <label className={styles.field}>
            <span className={styles.label}>아이디</span>
            <span className={styles.inputWrap}>
              <Icon className={styles.inputIconLeft} name="profile" size={16} />
              <TextInput
                aria-describedby={errors.userId ? "login-user-id-error" : undefined}
                aria-invalid={errors.userId}
                className={[
                  "input-with-icon-left",
                  styles.input,
                  errors.userId ? "is-error" : "",
                  shakeFields.userId ? "shake" : "",
                ].filter(Boolean).join(" ")}
                onAnimationEnd={() => setShakeFields((current) => ({ ...current, userId: false }))}
                onChange={(event) => {
                  setUserId(event.target.value);
                  setLoginMessage("");
                  if (event.target.value.trim()) {
                    setErrors((current) => ({ ...current, userId: false }));
                  }
                }}
                placeholder="아이디를 입력하세요"
                ref={userIdRef}
                type="text"
                value={userId}
              />
            </span>
            {errors.userId ? <FormError id="login-user-id-error">아이디를 입력해주세요.</FormError> : null}
          </label>

          <label className={styles.field}>
            <span className={styles.label}>비밀번호</span>
            <span className={styles.inputWrap}>
              <Icon className={styles.inputIconLeft} name="lock" size={16} />
              <TextInput
                aria-describedby={errors.password ? "login-password-error" : undefined}
                aria-invalid={errors.password}
                className={[
                  "input-with-icon-both",
                  styles.input,
                  errors.password ? "is-error" : "",
                  shakeFields.password ? "shake" : "",
                ].filter(Boolean).join(" ")}
                onAnimationEnd={() => setShakeFields((current) => ({ ...current, password: false }))}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setLoginMessage("");
                  if (event.target.value.trim()) {
                    setErrors((current) => ({ ...current, password: false }));
                  }
                }}
                placeholder="비밀번호를 입력하세요"
                ref={passwordRef}
                type="password"
                value={password}
              />
              <Icon className={styles.inputIconRight} name="visibility" size={16} />
            </span>
            {errors.password ? <FormError id="login-password-error">비밀번호를 입력해주세요.</FormError> : null}
          </label>
        </div>

        <div className={styles.loginOptions}>
          <Checkbox className={styles.autoLogin} name="autoLogin">
            자동로그인
          </Checkbox>
          <button
            className={styles.findPasswordButton}
            onClick={() => setIsFindPasswordOpen(true)}
            type="button"
          >
            비밀번호 찾기
          </button>
        </div>

        {loginMessage ? <FormError>{loginMessage}</FormError> : null}

        <Button
          className={styles.submitButton}
          disabled={isLoginSubmitting || isLoginTransitioning}
          isLoading={isLoginSubmitting}
          size="lg"
          type="submit"
        >
          로그인
        </Button>
      </form>

      {isLoginTransitioning ? <div aria-hidden="true" className={styles.loginTransitionPanel} /> : null}

      <Modal isOpen={isFindPasswordOpen} onClose={closeFindPassword}>
        <ModalHeader onClose={closeFindPassword}>비밀번호 찾기</ModalHeader>
        <form noValidate onSubmit={issueTemporaryPassword}>
          <ModalBody>
            <div className={styles.resetFieldStack}>
              <FormGroup label="아이디" required>
                <TextInput
                  aria-describedby={resetErrors.userId ? "reset-user-id-error" : undefined}
                  aria-invalid={resetErrors.userId}
                  className={[
                    styles.input,
                    resetErrors.userId ? "is-error" : "",
                    resetShakeFields.userId ? "shake" : "",
                  ].filter(Boolean).join(" ")}
                  onAnimationEnd={() => setResetShakeFields((current) => ({ ...current, userId: false }))}
                  onChange={(event) => {
                    setResetUserId(event.target.value);
                    setTemporaryPassword("");
                    if (event.target.value.trim()) {
                      setResetErrors((current) => ({ ...current, userId: false }));
                    }
                  }}
                  placeholder="아이디를 입력하세요"
                  ref={resetUserIdRef}
                  type="text"
                  value={resetUserId}
                />
                {resetErrors.userId ? (
                  <FormError id="reset-user-id-error">아이디를 입력해주세요.</FormError>
                ) : null}
              </FormGroup>

              <FormGroup label="이름" required>
                <TextInput
                  aria-describedby={resetErrors.name ? "reset-name-error" : undefined}
                  aria-invalid={resetErrors.name}
                  className={[
                    styles.input,
                    resetErrors.name ? "is-error" : "",
                    resetShakeFields.name ? "shake" : "",
                  ].filter(Boolean).join(" ")}
                  onAnimationEnd={() => setResetShakeFields((current) => ({ ...current, name: false }))}
                  onChange={(event) => {
                    setResetName(event.target.value);
                    setTemporaryPassword("");
                    if (event.target.value.trim()) {
                      setResetErrors((current) => ({ ...current, name: false }));
                    }
                  }}
                  placeholder="이름을 입력하세요"
                  ref={resetNameRef}
                  type="text"
                  value={resetName}
                />
                {resetErrors.name ? (
                  <FormError id="reset-name-error">이름을 입력해주세요.</FormError>
                ) : null}
              </FormGroup>

              <FormGroup label="이메일" required>
                <TextInput
                  aria-describedby={resetErrors.email ? "reset-email-error" : undefined}
                  aria-invalid={resetErrors.email}
                  className={[
                    styles.input,
                    resetErrors.email ? "is-error" : "",
                    resetShakeFields.email ? "shake" : "",
                  ].filter(Boolean).join(" ")}
                  onAnimationEnd={() => setResetShakeFields((current) => ({ ...current, email: false }))}
                  onChange={(event) => {
                    setResetEmail(event.target.value);
                    setTemporaryPassword("");
                    if (event.target.value.trim()) {
                      setResetErrors((current) => ({ ...current, email: false }));
                    }
                  }}
                  placeholder="name@example.com"
                  ref={resetEmailRef}
                  type="email"
                  value={resetEmail}
                />
                {resetErrors.email ? (
                  <FormError id="reset-email-error">이메일을 입력해주세요.</FormError>
                ) : null}
              </FormGroup>
            </div>

            <div aria-live="polite" className={styles.temporaryPasswordPanel}>
              <span className={styles.temporaryPasswordLabel}>임시 비밀번호</span>
              {temporaryPassword ? (
                <strong className={styles.temporaryPasswordValue}>{temporaryPassword}</strong>
              ) : (
                <span className={styles.temporaryPasswordPlaceholder}>
                  발급 버튼을 누르면 여기에 표시됩니다
                </span>
              )}
            </div>
          </ModalBody>

          <ModalFooter>
            <Button type="button" variant="secondary" onClick={closeFindPassword}>
              닫기
            </Button>
            <Button type="submit">임시 비밀번호 발급</Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}

function createTemporaryPassword() {
  return `Bb-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.random().toString(36).slice(2, 6)}`;
}
