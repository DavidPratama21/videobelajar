import Input from "../components/Input";
import Button from "../../../components/atoms/Button";

const Profil = () => {
  // Sementara aja, biar ga error
  const handleChange = () => {
    return "ok";
  };
  const userStored = localStorage.getItem('user')
  const user = userStored ? JSON.parse(userStored) : null

  return (
    <div className="grid gap-6 p-6 bg-other-primary border border-other-border rounded-[10px]">
      <div className="flex items-center gap-3.5 sm:gap-4">
        <img
          src={"/assets/images/user/1.png"}
          alt="Profile Picture"
          className="rounded md:size-23"
        />
        {/* Nama, Email, Change Picture */}
        <div className="grid sm:gap-2">
          <p className="sm:text-xl font-semibold text-dark-primary leading-[120%]">
            {user.name}
          </p>
          <p className="sm:text-lg text-dark-primary leading-[140%] tracking-[0.2px]">
            {user.email}
          </p>
          <input
            type="file"
            id="avatarUpload"
            accept="image/*"
            className="hidden"
            // onChange={handleAvatarChange}
          />
          <button
            className="w-fit font-bold text-tertiary leading-[140%] tracking-[0.2px]"
            // onClick={() => document.getElementById("avatarUpload").click()}
          >
            Ganti Foto Profil
          </button>
        </div>
      </div>
      <span className="w-full h-fit border border-other-border"></span>
      <form
        // onSubmit={(e) => {
        //   e.preventDefault();
        //   updateProfile(user.id, (updatedName, updatedEmail) => {
        //     setDisplayName(updatedName);
        //     setDisplayEmail(updatedEmail);
        //   });
        // }}
        className="grid gap-6"
      >
        <div className="grid xl:grid-cols-[1.5fr_1fr] xl:grid-rows-2 gap-4">
          {/* Nama & Email */}
          <div className="grid gap-4 lg:flex">
            <Input
              id={``}
              type={`text`}
              value={``}
              onChange={() => handleChange}
              className="sm:flex-1"
            >
              Nama Lengkap
            </Input>
            <Input
              id={``}
              type={`email`}
              value={``}
              onChange={() => handleChange}
              className="sm:flex-1"
            >
              E-Mail
            </Input>
          </div>
          {/* Gender & Phone */}
          <div className="grid gap-4 md:row-span-2">
            {/* Gender */}
            {/* <div className="relative md:flex-1">
              <select
                // value={gender}
                // disabled
                className="peer w-full h-[49px] px-3 border border-gray-300 rounded-[10px] focus:outline-none focus:border-primary"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <label
                htmlFor=""
                className="absolute left-3 -top-2 px-[5px] text-sm font-medium bg-white text-gray-500 transition-all peer-focus:text-primary"
              >
                Jenis Kelamin
              </label>
            </div> */}
            {/* Phone */}
            <div className="flex gap-4">
              <select
                // type=""
                id=""
                className="peer h-[49px] px-3 border border-gray-300 rounded-[10px] focus:outline-none focus:border-primary"
              >
                <option value="62">+62</option>
                <option value="61">+61</option>
              </select>
              <Input
                id="Phone"
                // value={phone}
                type="number"
                // onChange={(e) => setField("phone", e.target.value)}
                className="flex-1"
              >
                No. Hp
              </Input>
            </div>
          </div>
          {/* PW */}
          <div className="grid lg:flex gap-4">
            <Input
              id="PW"
              onChange={() => handleChange}
              type={"password"}
              // value={password}
              className="sm:flex-1"
            >
              Password
            </Input>
            <Input
              id="PWConfirm"
              type={"password"}
              onChange={() => handleChange}
              className="sm:flex-1"
            >
              Konfirmasi Password
            </Input>
          </div>
        </div>
        <div className="sm:h-11.5 sm:justify-self-end">
          <Button className="" type="submit">
            Simpan
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Profil;
