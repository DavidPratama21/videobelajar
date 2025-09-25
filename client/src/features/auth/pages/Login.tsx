import { useNavigate } from "react-router";
import AuthLayout from "../../../layouts/AuthLayout";
import Button from "../../../components/atoms/Button";
import Google_logo from "../components/GoogleLogo.js";
import Input from "../components/Input";
import { userStore } from "../../../store/UserStore";

const Login = () => {
  const navigate = useNavigate();
  const { email, password, setField, resetForm, login } = userStore();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(navigate);
  };

  return (
    <AuthLayout>
      <div className="py-7 sm:py-16 px-5 sm:px-30 bg-[#FFFDF3]">
        <div className="md:w-[590px] grid mx-auto p-5 sm:p-9 gap-5 sm:gap-9 text-[14px] text-center bg-light-primary rounded-sm border border-other-border">
          {/* Title & Desc */}
          <div className="grid gap-2.5">
            <h3 className="text-[24px] sm:text-[32px] font-semibold text-dark-primary leading-[110%]">
              Masuk ke Akun
            </h3>
            <p className="sm:text-[16px] text-dark-secondary leading-[140%] tracking-[0.2px]">
              Yuk, lanjutin belajarmu di videobelajar.
            </p>
          </div>
          {/* Form */}
          <div className="grid gap-5 sm:gap-6">
            {/* Email PW || Login / Regist */}
            <div className="grid gap-4">
              <form onSubmit={handleLogin} className="grid gap-6 sm:gap-6">
                <div className="grid gap-3 sm:gap-4 text-dark-secondary">
                  {/* Email */}
                  <Input
                    label="E-mail"
                    value={email}
                    onChange={(e) => setField("email", e.target.value)}
                    type="email"
                  />

                  {/* Password */}
                  <Input
                    label="Kata Sandi"
                    value={password}
                    onChange={(e) => setField("password", e.target.value)}
                    type="password"
                  />

                  {/* Forgot Password */}
                  <a
                    href=""
                    className="justify-self-end font-medium sm:text-[16px]"
                  >
                    Lupa Password?
                  </a>
                </div>
                {/* Button Masuk */}
                <Button type="submit">Masuk</Button>
              </form>
              {/* Button Daftar */}
              <Button
                type="button"
                style="reverse"
                action={() => {
                  resetForm();
                  navigate("/register");
                }}
              >
                Daftar
              </Button>
            </div>
            {/* --- Atau --- */}
            <div className="w-full flex items-center gap-2.5 mx-auto">
              <div className="h-0.5 w-full bg-other-border "></div>
              <p className="text-dark-secondary">atau</p>
              <div className="h-0.5 w-full bg-other-border "></div>
            </div>

            {/* Masuk dengan Google */}
            <button className="w-full flex items-center justify-center gap-2 py-2 mx-auto font-bold border border-other-border rounded-[10px]">
              <div className="flex gap-2">
                <Google_logo />
                <p className="text-dark-secondary">Masuk dengan Google</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
