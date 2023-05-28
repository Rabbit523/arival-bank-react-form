import { useForm, Controller } from "react-hook-form";
import { FaCheck } from "react-icons/fa";
import { MdError } from "react-icons/md";
import Select, { components, StylesConfig } from "react-select";
import { FormProps } from "../../types";

const customStyles: StylesConfig<any, false> = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderColor: state.isFocused ? 'transparent' : 'transparent',
    boxShadow: state.isFocused ? 0 : 0,
    '&:hover': {
      borderColor: state.isFocused ? 'transparent' : 'transparent'
    },
    height: 40,
    minHeight: 40,
  }),
  placeholder: (styles) => ({
    ...styles,
    color: '#C0BCDF',
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    height: 40,
    padding: "0 6px",
  }),
  input: (provided: any) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorsContainer: (provided: any) => ({
    ...provided,
    height: 40,
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#0B1C49',  // This will change the color of the dropdown indicator
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused || state.isSelected ? "#F6F4FF" : null,
    color: "#413C5F",
    fontWeight: state.isSelected ? 600 : 400,
  }),
};

const CustomOption = ({ children, ...props }: any) => {
  return (
    <components.Option {...props}>
      <div className="flex items-center">
        {children}
        {props.isSelected && (
          <FaCheck
            className="ml-3 text-icon"
            size={10}
          />
        )}
      </div>
    </components.Option>
  );
};

export const InititalForm = ({ onComplete, countries }: FormProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = (data: any) => {
    onComplete({...data, country: data.country.value});
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h2 className="text-secondary-color pb-4">Super test form</h2>
      <p className="text-first-color">Initial info</p>
      <form
        className="bg-first-color form gap-10 p-5 md:p-10 rounded-2xl w-full md:w-96 mt-14 md:mt-0 max-w-custom"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2 relative">
          <label htmlFor="name" className="text-white">
            Username
          </label>
          <input
            type="text"
            id="name"
            placeholder="Input username"
            className="placeholder-primary focus:outline-0"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username?.message && <MdError className="absolute text-error top-[36px] right-[12px]" size={16} />}
          {errors.username?.message && (
            <p className="text-error error">
              {errors.username.message as string}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 relative">
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="placeholder-primary focus:outline-0"
            placeholder="Input email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email?.message && <MdError className="absolute text-error top-[36px] right-[12px]" size={16} />}
          {errors.email?.message && (
            <p className="text-error error">{errors.email.message as string}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="country" className="text-white">
            Country
          </label>
          <Controller
            name="country"
            control={control}
            defaultValue=""
            rules={{ required: "Country is required" }}
            render={({ field }) => (
              <Select
                {...field}
                components={{
                  Option: CustomOption,
                }}
                styles={customStyles}
                options={countries}
                placeholder="Select country"
              />
            )}
          />
          {errors.country && (
            <p className="text-error error">
              {errors.country.message as string}
            </p>
          )}
        </div>
        <button
          type="submit"
          className={
            !isValid
              ? "bg-btn-disabled text-btn-txt-second"
              : "bg-white text-secondary-color"
          }
        >
          Continue
        </button>
      </form>
    </div>
  );
};
