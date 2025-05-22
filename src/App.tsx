import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar: string;
  creationAt: string;
  updatedAt: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("");

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
  };

  const filteredUsers = selectedRole
    ? users.filter((user) => user.role === selectedRole)
    : users;

  const uniqueRoles = Array.from(new Set(users.map((user) => user.role)));

  return (
    <div
      style={{
        backgroundColor: "#000000", // พื้นหลังดำสนิท
        color: "#ffffff",
        minHeight: "100vh",
        padding: "2rem",
        fontFamily: "'Noto Sans Thai', sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", margin: "16px 0", color: "#7b0000" }}>
        🔴 รายชื่ออาชญากรข้ามชาติที่ต้องการตัว
      </h1>

      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <a href="/src/assets/index.html" target="_blank" rel="noopener noreferrer">
          <button
            style={{
              padding: "10px 20px",
              fontSize: "1rem",
              borderRadius: "6px",
              backgroundColor: "#7b0000",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.6)",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#590000")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#7b0000")
            }
          >
            สถิติอาชญากรรม
          </button>
        </a>
      </div>

      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <p style={{ fontWeight: "bold", color: "#ccc" }}>กรองตามระดับความผิด</p>
        <select
          onChange={handleFilterChange}
          value={selectedRole}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #555",
            backgroundColor: "#222",
            color: "#eee",
            fontSize: "1rem",
          }}
        >
          <option value="">แสดงทั้งหมด</option>
          {uniqueRoles.map((role, index) => (
            <option key={index} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr", // 1 คอลัมน์
          gap: "16px",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            style={{
              backgroundColor: "#222222",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 12px rgba(123, 0, 0, 0.7)",
              textAlign: "center",
              transition: "transform 0.2s",
              border: "2px solid #7b0000",
              color: "#ddd",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "scale(1.02)";
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "0 4px 20px rgba(123, 0, 0, 0.9)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "0 2px 12px rgba(123, 0, 0, 0.7)";
            }}
          >
            <img
              src={user.avatar}
              alt={user.name}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "14px",
                border: "3px solid #7b0000",
              }}
            />
            <h2 style={{ margin: "8px 0", fontSize: "1.3rem", color: "#fff" }}>
              {user.name}
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#bbb" }}>{user.email}</p>
            <p style={{ fontSize: "0.9rem", marginBottom: "14px", color: "#7b0000" }}>
              ระดับ: {user.role}
            </p>
            <button
              style={{
                padding: "8px 20px",
                borderRadius: "24px",
                backgroundColor: "#7b0000",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "1rem",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#590000")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#7b0000")
              }
              onClick={() => alert(`กำลังดูข้อมูลของ ${user.name}...`)}
            >
              รายละเอียดผู้ต้องหา
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
