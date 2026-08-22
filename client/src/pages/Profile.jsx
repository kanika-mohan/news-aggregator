import { useEffect, useState } from "react";
import { User, Save } from "lucide-react";
import { getCurrentUser, updatePreferences } from "../services/api";

const categories = [
  "Technology",
  "Business",
  "Sports",
  "Entertainment",
  "Health",
  "Science",
];

function Profile() {
  const [user, setUser] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getCurrentUser();

        setUser(data.user);
        setSelectedCategories(
          data.user?.preferredCategories || []
        );
      } catch (error) {
        console.error("Profile loading failed:", error);
        setMessage("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const toggleCategory = (category) => {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category]
    );
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage("");

      const data = await updatePreferences(
        selectedCategories
      );

      setUser(data.user);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setMessage("Preferences updated successfully!");
    } catch (error) {
      console.error("Preference update failed:", error);
      setMessage("Failed to update preferences.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-loading">
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">

      <div className="profile-container">

        <div className="profile-header">
          <div className="profile-avatar">
            <User size={38} />
          </div>

          <div>
            <h1>{user?.name || "User"}</h1>
            <p>{user?.email}</p>
          </div>
        </div>

        <div className="profile-card">

          <div className="profile-card-header">
            <h2>News Preferences</h2>
            <p>
              Choose the categories you are interested in.
            </p>
          </div>

          <div className="preference-grid">

            {categories.map((category) => {
              const selected =
                selectedCategories.includes(category);

              return (
                <button
                  key={category}
                  className={
                    selected
                      ? "preference-button selected"
                      : "preference-button"
                  }
                  onClick={() =>
                    toggleCategory(category)
                  }
                >
                  {selected ? "✓ " : ""}
                  {category}
                </button>
              );
            })}

          </div>

          <button
            className="save-preferences-button"
            onClick={handleSave}
            disabled={saving}
          >
            <Save size={18} />

            {saving
              ? "Saving..."
              : "Save Preferences"}
          </button>

          {message && (
            <p className="profile-message">
              {message}
            </p>
          )}

        </div>

      </div>

    </div>
  );
}

export default Profile;