import { useMemo } from "react";

export default function PasswordStrengthMeter({ password }) {
  const strength = useMemo(() => {
    if (!password) return 0;
    
    let score = 0;
    // Length check
    if (password.length > 5) score++;
    if (password.length > 8) score++;
    // Complexity checks
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    return Math.min(score, 4);
  }, [password]);

  const strengthText = ["Very Weak", "Weak", "Good", "Strong", "Very Strong"];
  const strengthColor = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500"
  ];

  return (
    <div className="mt-2">
      <div className="flex items-center gap-1 h-1.5 mb-1">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`h-full flex-1 rounded-sm ${
              i < strength ? strengthColor[strength] : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-gray-600">
        Strength: {strengthText[strength]}
      </p>
    </div>
  );
}