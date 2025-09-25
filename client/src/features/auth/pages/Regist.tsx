import { useNavigate } from "react-router";
import AuthLayout from "../../../layouts/AuthLayout";
import Button from "../../../components/atoms/Button";
import Input from "../components/Input";
// import PhoneNumberInput from "../components/PhoneNumberInput.js";
// import MobilePhoneInput from "../components/PhoneInput";
import Google_logo from "../components/GoogleLogo.js";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { userStore } from "../../../store/UserStore";

const Regist = () => {
  const navigate = useNavigate();
  const {
    name,
    email,
    phone,
    gender,
    password,
    confirmPassword,
    setField,
    resetForm,
    register,
  } = userStore();

  const handleRegis = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await register(navigate);
  };

  return (
    <AuthLayout>
      <div className="py-7 sm:py-16 px-5 sm:px-30 bg-[#FFFDF3]">
        <div className="md:w-[590px] grid mx-auto p-5 gap-5 bg-light-primary rounded-sm border border-other-border">
          {/* Title & Desc */}
          <div className="grid gap-2.5 text-center">
            <h3 className="text-2xl sm:text-[32px] font-semibold text-dark-primary leading-[110%]">
              Pendaftaran Akun
            </h3>
            <p className="text-sm sm:text-base text-dark-secondary leading-[140%] tracking-[0.2px]">
              Yuk, daftarin akunmu sekarang juga!
            </p>
          </div>
          {/* Form */}
          <div className="grid gap-5 sm:gap-6">
            <div className="grid gap-4">
              <form onSubmit={handleRegis} className="grid gap-6">
                <div className="grid gap-3 sm:gap-4">
                  {/* Name */}
                  <Input
                    label="Nama"
                    value={name}
                    onChange={(e) => setField("name", e.target.value)}
                  />

                  {/* Email */}
                  <Input
                    label="E-mail"
                    value={email}
                    onChange={(e) => setField("email", e.target.value)}
                  />

                  {/* Phone */}
                  <div className="grid">
                    <label
                      htmlFor=""
                      className="text-sm text-dark-secondary leading-[140%] tracking-[0.2px] after:content-['*'] after:text-red-500 after:ml-1 sm:text-base"
                    >
                      No. Hp
                    </label>
                    <div className="grid gap-2 py-1 border border-other-border rounded-[6px]">
                      <PhoneInput
                        // required
                        value={phone}
                        onChange={(value) => setField("phone", value)}
                        country="id"
                        buttonClass="!border-none !bg-light-primary"
                        containerClass="!py-1 px-2.5"
                        dropdownClass="font-lato"
                        inputClass="!border-none !bg-light-primary font-lato !w-full "
                      />
                    </div>
                  </div>
                  {/* <PhoneNumberInput />
                  <MobilePhoneInput /> */}

                  {/* Gender */}
                  <div className="grid">
                    <label
                      htmlFor="gender"
                      className="text-sm sm:text-base leading-[140%] tracking-[0.2px] after:content-['*'] after:text-red-500 after:ml-1"
                    >
                      Jenis Kelamin
                    </label>
                    <select
                      required
                      value={gender}
                      onChange={(e) =>
                        setField("gender", e.target.value as "male" | "female")
                      }
                      name="gender"
                      className="px-2.5 py-3 rounded-[6px] border border-other-border"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>

                  {/* Password */}
                  <Input
                    label="Kata Sandi"
                    value={password}
                    onChange={(e) => setField("password", e.target.value)}
                    type="password"
                  />
                  {/* Confirm Password */}
                  <Input
                    label="Konfirmasi Kata Sandi"
                    value={confirmPassword}
                    onChange={(e) =>
                      setField("confirmPassword", e.target.value)
                    }
                    type="password"
                  />

                  {/* Forgot Password */}
                  <a
                    href=""
                    className="text-sm font-medium text-dark-secondary leading-[140%] tracking-[0.2px] justify-self-end sm:text-base"
                  >
                    Lupa Password?
                  </a>
                </div>
                <Button type="submit">Daftar</Button>
              </form>
              <Button
                type="button"
                action={() => {
                  resetForm();
                  navigate("/login");
                }}
                style="reverse"
              >
                Masuk
              </Button>
            </div>
            {/* --- Atau --- */}
            <div className="flex mx-auto items-center gap-2.5 w-full">
              <div className="h-0.5 w-full bg-other-border "></div>
              <p className="text-dark-secondary">atau</p>
              <div className="h-0.5 w-full bg-other-border "></div>
            </div>

            {/* Daftar dengan Google */}
            <button className="w-full mx-auto font-bold py-2 flex items-center justify-center gap-2 border border-other-border rounded-[10px]">
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

export default Regist;
