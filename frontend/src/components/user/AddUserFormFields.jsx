import BasicInput from "../ui/BasicInput.jsx";
import TypeInput from "../ui/TypeInput.jsx";

function AddUserFormFields({ form, errors, change, includeRole = false }) {
  return (
    <>
      <BasicInput label="Nombre">
        <TypeInput
          type="text"
          name="nombre"
          placeholder="Nombres(s)"
          value={form.nombre}
          onChange={change}
          required
        />
        {errors.nombre && (
          <small style={{ color: "red", display: "block" }}>
            {errors.nombre}
          </small>
        )}
      </BasicInput>

      <BasicInput label="Apellido">
        <TypeInput
          type="text"
          name="apellido"
          placeholder="Apellido(s)"
          value={form.apellido}
          onChange={change}
          required
        />
        {errors.apellido && (
          <small style={{ color: "red", display: "block" }}>
            {errors.apellido}
          </small>
        )}
      </BasicInput>

      <BasicInput label="Fecha de nacimiento">
        <TypeInput
          type="date"
          name="fec_nac"
          value={form.fec_nac}
          onChange={change}
          required
        />
        {errors.fec_nac && (
          <small style={{ color: "red", display: "block" }}>
            {errors.fec_nac}
          </small>
        )}
      </BasicInput>

      <BasicInput label="Email">
        <TypeInput
          type="email"
          name="email"
          placeholder="correo@ejemplo.com"
          value={form.email}
          onChange={change}
          required
        />
        {errors.email && (
          <small style={{ color: "red", display: "block" }}>
            {errors.email}
          </small>
        )}
      </BasicInput>

      <BasicInput label="Usuario">
        <TypeInput
          type="text"
          name="usuario"
          placeholder="Usuario"
          value={form.usuario}
          onChange={change}
          required
        />
        {errors.usuario && (
          <small style={{ color: "red", display: "block" }}>
            {errors.usuario}
          </small>
        )}
      </BasicInput>

      <BasicInput label="Contraseña">
        <TypeInput
          type="password"
          name="password"
          value={form.password}
          onChange={change}
          required
        />
        {errors.password && (
          <small style={{ color: "red", display: "block" }}>
            {errors.password}
          </small>
        )}
      </BasicInput>

      <BasicInput label="Confirmar contraseña">
        <TypeInput
          type="password"
          name="confirm_password"
          value={form.confirm_password}
          onChange={change}
          required
        />
        {errors.confirm_password && (
          <small style={{ color: "red", display: "block" }}>
            {errors.confirm_password}
          </small>
        )}
      </BasicInput>

      <div style={{ marginTop: "15px", marginBottom: "15px" }}>
        <ReCAPTCHA
          sitekey="6LeD9cgsAAAAAEsdS_PkWKuwuLfhQn_d6H0OEGcv"
          onChange={onCaptchaChange}
        />
      </div>

      <input
        type="submit"
        value="Registrarse"
        className="btn-custom"
        disabled={!formularioEsValido()}
        style={{
          opacity: formularioEsValido() ? 1 : 0.5,
          cursor: formularioEsValido() ? "pointer" : "not-allowed",
        }}
      />
    </>
  );
}

export default AddUserFormFields;
