# UniKonet – Features Manual (Standard Scaffold)

This manual outlines the architecture and features implemented during the development of the **UniKonet** University Management System.

## 1. Backend Architecture (`/backend`)
The backend follows a **Clean Architecture** pattern, utilizing **PostgreSQL** for relational data integrity and **Prisma 6** for type-safe database access.

- **Prisma & PostgreSQL**: Fully migrated from MongoDB to a SQL-based relational architecture. Models are defined in `prisma/schema.prisma` with explicit relationships.
- **Multi-Tenant Ready**: Every database model includes a `universityId` and uses `UUID` for identifiers to ensure multi-university scalability.
- **Service & Repository Pattern**: Logic is separated for high testability:
    - `repositories/`: Using Prisma Client for optimized SQL queries.
    - `services/`: Business logic, password hashing (`bcryptjs`), and coordination.
    - `controllers/`: Request orchestration and error handling.
- **Authentication**:
    - **JWT Security**: State-aware login/register flows with 30-day token persistence.
    - **RBAC Middleware**: Deep role-based authorization for Super Admin, University Admin, Lecturer, and Student.
- **Core Entities**:
    - `University`, `User`, `Student`, `Lecturer`, `Department`, `Course`, `Enrollment`, `Result`, `Payment`, `Announcement`.

## 2. Admin Dashboard (`/admin-dashboard`)
A premium, pixel-perfect web interface built with **React** and **Vite 8**.

- **Modular UI Component Library**: Custom-built, reusable widgets located in `src/components/dashboard/`:
    - `StatCard`, `StudentTable`, `AdmissionsOverview`, `Announcements`, `ClassSchedule`.
- **Advanced Layout**:
    - **Dark Slate Sidebar (`#1e293b`)**: Modern, high-contrast navigation with circular branding and blue active states.
    - **White Utility Header**: Sticky header with search, notifications, and profile management.
- **Routing**: Clean separation of feature pages (Students, Lecturers, Admissions) within the `src/pages/` directory.
- **API Interceptors**: Global Axios instance with automatic token attachment and centralized error handling in `services/api.js`.

## 3. Desktop Application (`/electron`) [ARCHIVED - Optional]
The admin dashboard is capable of running as a native desktop app.

- **Note**: Currently secondary to the web-first experience. Requires manual Electron binary installation via `npm install` in the `electron/` folder.

## 4. Mobile Application (`/mobile-app`)
A cross-platform app built with **Flutter** for the daily university experience.

- **Strict Navigation Shield**: Enforced "Forward-Only" navigation logic (using `pushReplacement`) to maintain user authentication states and prevent UI backtracking errors.
- **Emulator & Device Ready**: `ApiService` configured with `10.0.2.2` for Android Emulators and `localhost` for physical devices/iOS simulators.
- **Feature Set**: Main Feed, Chat, Dashboard/Stats, Notifications, and Profile management.

## 5. Technical Stack Summary
| Layer | Technology |
|---|---|
| **Frontend** | React, Tailwind v4, Vite |
| **Mobile** | Flutter (Dart), material3 |
| **Backend** | Node.js, Express, Prisma 6 |
| **Database** | PostgreSQL |
| **Auth** | JWT, bcryptjs |

## 6. Deployment & Persistence
- **Git Sync**: Unified repository at [https://github.com/Manuel-Hub371/uni-Konet.git](https://github.com/Manuel-Hub371/uni-Konet.git).
- **Environment**: Scalable `.env` structures for database URLs and JWT secrets.
