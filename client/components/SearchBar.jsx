export default function SearchBar({ onChange, value, disabled }) {
  return (
    <input
      className="form-text"
      onChange={(event) => onChange(event)}
      id="searchbar"
      type="search"
      name="search"
      value={value}
      placeholder={
        disabled ? "Login to enable search." : "type here to filter results..."
      }
      disabled={disabled}
    />
  );
}
