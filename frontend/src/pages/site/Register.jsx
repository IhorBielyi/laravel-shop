import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../components/site/layout/Header.jsx";
import { useAuth } from "../../auth/AuthContext.jsx";

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [firstname, setFirstname] = useState("");
    const [middlename, setMiddlename] = useState("");
    const [surname, setSurname] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState({}); // { firstname:[], ... }
    const [submitting, setSubmitting] = useState(false);

    const resetErrors = () => {
        setError("");
        setFieldErrors({});
    };

    const firstFieldError = () => {
        const keys = ["firstname", "middlename", "surname", "phone_number", "email", "password"];
        for (const k of keys) {
            const msg = fieldErrors?.[k]?.[0];
            if (msg) return msg;
        }
        return "";
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        resetErrors();

        const fn = firstname.trim();
        const mn = middlename.trim();
        const sn = surname.trim();
        const pn = phoneNumber.trim();
        const em = email.trim();

        if (!fn) return setError("Вкажіть імʼя.");
        if (!mn) return setError("Вкажіть по батькові.");
        if (!sn) return setError("Вкажіть прізвище.");
        if (!pn) return setError("Вкажіть номер телефону.");
        if (!em) return setError("Вкажіть email.");

        if (password !== passwordConfirmation) {
            setError("Паролі не співпадають.");
            return;
        }

        setSubmitting(true);

        try {
            await register({
                firstname: fn,
                middlename: mn,
                surname: sn,
                phone_number: pn,
                email: em,
                password,
                password_confirmation: passwordConfirmation,
            });

            navigate("/");
        } catch (e2) {
            const msg = e2?.response?.data?.message || "Помилка реєстрації. Перевірте дані.";
            const errs = e2?.response?.data?.errors || {};
            setError(msg);
            setFieldErrors(errs);
        } finally {
            setSubmitting(false);
        }
    };

    const niceError = firstFieldError() || error;

    return (
        <>
            <Header />

            <main className="min-h-[calc(100vh-64px)] bg-slate-50">
                <div className="mx-auto max-w-6xl px-4 py-10">
                    <div className="mx-auto w-full max-w-md">
                        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                            <div className="p-6 sm:p-8">
                                <div className="text-center">
                                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                                        Створення акаунту
                                    </h1>
                                    <p className="mt-2 text-sm text-slate-500">
                                        Зареєструйтеся, щоб почати покупки
                                    </p>
                                </div>

                                {niceError && (
                                    <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                        {niceError}
                                    </div>
                                )}

                                <form onSubmit={onSubmit} className="mt-6 space-y-4">
                                    <Field
                                        label="Імʼя"
                                        placeholder="Ваше імʼя"
                                        value={firstname}
                                        onChange={setFirstname}
                                        disabled={submitting}
                                        autoComplete="given-name"
                                        errorText={fieldErrors?.firstname?.[0]}
                                    />

                                    <Field
                                        label="По батькові"
                                        placeholder="По батькові"
                                        value={middlename}
                                        onChange={setMiddlename}
                                        disabled={submitting}
                                        autoComplete="additional-name"
                                        errorText={fieldErrors?.middlename?.[0]}
                                    />

                                    <Field
                                        label="Прізвище"
                                        placeholder="Прізвище"
                                        value={surname}
                                        onChange={setSurname}
                                        disabled={submitting}
                                        autoComplete="family-name"
                                        errorText={fieldErrors?.surname?.[0]}
                                    />

                                    <Field
                                        label="Телефон"
                                        placeholder="+380..."
                                        value={phoneNumber}
                                        onChange={setPhoneNumber}
                                        disabled={submitting}
                                        autoComplete="tel"
                                        errorText={fieldErrors?.phone_number?.[0]}
                                    />

                                    <Field
                                        label="Email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={setEmail}
                                        disabled={submitting}
                                        autoComplete="email"
                                        errorText={fieldErrors?.email?.[0]}
                                    />

                                    <Field
                                        label="Пароль"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={setPassword}
                                        disabled={submitting}
                                        autoComplete="new-password"
                                        errorText={fieldErrors?.password?.[0]}
                                    />

                                    <Field
                                        label="Підтвердження пароля"
                                        type="password"
                                        placeholder="••••••••"
                                        value={passwordConfirmation}
                                        onChange={setPasswordConfirmation}
                                        disabled={submitting}
                                        autoComplete="new-password"
                                    />

                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition
                               hover:bg-sky-700
                               focus:outline-none focus:ring-4 focus:ring-sky-200
                               disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {submitting ? "Створення..." : "Створити акаунт"}
                                    </button>
                                </form>

                                <div className="my-6 flex items-center gap-3">
                                    <div className="h-px flex-1 bg-slate-200" />
                                    <span className="text-xs font-medium text-slate-400">або</span>
                                    <div className="h-px flex-1 bg-slate-200" />
                                </div>

                                <p className="text-center text-sm text-slate-600">
                                    Вже є акаунт?{" "}
                                    <Link to="/login" className="font-semibold text-sky-700 hover:text-sky-800">
                                        Увійти
                                    </Link>
                                </p>
                            </div>
                        </div>

                        <p className="mt-6 text-center text-xs text-slate-400">
                            Повернутися на{" "}
                            <Link to="/" className="font-semibold text-slate-600 hover:text-slate-900">
                                головну
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}

function Field({
                   label,
                   value,
                   onChange,
                   placeholder,
                   disabled,
                   type = "text",
                   autoComplete,
                   errorText,
               }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-slate-700">{label}</label>
            <div className="mt-2">
                <input
                    type={type}
                    className={`block w-full rounded-xl border bg-white px-4 py-3 text-slate-900 outline-none transition
                    placeholder:text-slate-400
                    focus:ring-4
                    ${
                        errorText
                            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                            : "border-slate-200 focus:border-sky-400 focus:ring-sky-100"
                    }`}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    required
                    disabled={disabled}
                    autoComplete={autoComplete}
                />
                {errorText ? (
                    <div className="mt-1 text-xs font-medium text-red-600">{errorText}</div>
                ) : null}
            </div>
        </div>
    );
}