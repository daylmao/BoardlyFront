# BoardlyFront

Frontend for the Boardly platform, a business project management application with Git-style collaborative boards and real-time features.

## 📋 Description

BoardlyFront is the user interface for Boardly, a platform designed for CEOs and business teams that enables managing organizations, activities, and projects through collaborative Kanban boards with Git-style workflow.

### Workflow
1. **CEO/Administrator** registers on the platform
2. Creates a **Company** (organization)
3. Generates a unique **invitation link** for employees to register in the company
4. Defines **Activities** within the company
5. Creates **Projects** associated with each activity
6. **Assigns employees** to projects with custom roles
7. Each project has a **Git-style board** with draggable tasks
8. Real-time collaboration among team members

## 🚀 Key Features

- **JWT-based authentication and authorization system**
- **Hierarchical management**: Companies → Activities → Projects
- **Link-based invitation system** for employee registration in companies
- **Employee assignment to projects** with custom roles defined by the CEO
- **Kanban boards** with drag & drop functionality
- **Real-time collaboration** Git-style for task management
- **Modern and responsive interface** built with Angular 19
- **Role management** within organizations and projects

## 🏗️ Architecture

The project follows an architecture based on:

- **Standalone Components**: Independent components without NgModule
- **Feature-based structure**: Each feature is self-contained with its components, services, guards, and interceptors
- **Shared**: Reusable components and utilities across features
- **Guards**: Route protection based on authentication and roles (within each feature)
- **Interceptors**: Centralized JWT token and HTTP error handling (within each feature)
- **Reactive Forms**: Robust validation and complex form handling

```
src/
└── app/
    ├── auth/              # Authentication, registration, and guards
    ├── companies/         # Company management
    ├── activities/        # Activity management
    ├── projects/          # Project management and role assignment
    ├── boards/            # Kanban boards
    └── shared/            # Shared components and utilities
```

## 🔑 Technical Features

### Authentication
- User login and registration
- Employee registration via unique company invitation link
- JWT token management
- Automatic refresh token
- Guards for route protection

### Role and team management
- Custom role system defined by the CEO
- Employee assignment to specific projects
- Team member management per project

### State management
- Angular 19 Signals for reactivity
- Singleton services for shared state
- RxJS for complex data flows

### Collaborative boards
- Native drag & drop with CDK
- Real-time updates
- Task state management (To Do, In Progress, Done, etc.)
- Task assignment to team members

## 👨‍💻 Author

[daylmao](https://github.com/daylmao)
