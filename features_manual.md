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
- **Lecturer Management Module (Faculty & Curriculum)**:
    - **Faculty Registry**: Tracks the status and department-wise allocation of all university faculty members.
    - **Workload Monitoring**: Intelligent "Overloaded" badges that flag faculty members with high course assignments.
    - **Professional Actions**: Integrated View/Edit/Suspend/Reactivate workflows for efficient faculty administration.
- **Admissions Module (Command Center)**:
    - **Intake Cycle Management**: Supports multiple academic cycles (e.g., 2024, 2025 Intake) with "Open/Closed" states.
    - **Interactive Flow**: Automated stats filtering and safe-guard "Cycle Closure" workflows.
- **Student Management Module (Lifecycle & Progression)**:
    - **Lifecycle Dashboard**: Real-time tracking of Active, Graduated, Suspended, and Dismissed students.
    - **Academic Timeline**: Visual progression tracker (Level 100 → 400) that reflects institutional rules like level freezing during suspension.
    - **Deep-Profile Intelligence**: Sectionalized views for Personal Info, Academic Records, Course Registry, and Results (GPA).
- **Premium UI/UX Philosophy**:
    - **"Premium Modern" Look**: Modern glassmorphism (`backdrop-blur`), vibrant blue accents, and high-fidelity typography.
    - **Micro-interactions**: Subtle entrance animations (`duration-700`), hover lifts, and status "pings" for a responsive feel.
    - **Clean Hierarchy**: Logical grouping of filters, stats, and data tables for maximum administrative efficiency.

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
