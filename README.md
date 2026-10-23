# Employee Dashboard & Directory (ICT MERN Stack)

A modern, responsive Employee Dashboard and Management Portal built using **React**, **React Router v7**, **Bootstrap 5**, and custom CSS.

---

## 🚀 Key Features

1. **Navigation Bar ([Navbar.jsx](file:///c:/Alvin/College/S3/ICT%20mern%20stack/src/components/Navbar.jsx))**:
   - Modern glassmorphic sticky navbar.
   - Distinct **Home** and **Employee Form** links with active indicator states.
   - Live badge showing total employee count.
   - Fully responsive with mobile hamburger toggle menu.

2. **Home / Employee Dashboard ([Dashboard.jsx](file:///c:/Alvin/College/S3/ICT%20mern%20stack/src/pages/Dashboard.jsx))**:
   - Both `/` and `/home` navigate to the same Dashboard.
   - Fetches live data from the external API: [`https://jsonplaceholder.typicode.com/users`](https://jsonplaceholder.typicode.com/users).
   - Displays all required fields: **`id`**, **`name`**, and **`email`**.
   - Includes view toggles between **Tabular View** and **Card View**.
   - Real-time search filter by ID, Name, or Email.
   - Summary statistics cards: *Total Employees*, *Fetched from API*, and *Form Submissions*.
   - Instant "Sync API" refresh button with loading spinner and error-retry handling.

3. **Employee Registration Form ([EmployeeForm.jsx](file:///c:/Alvin/College/S3/ICT%20mern%20stack/src/pages/EmployeeForm.jsx))**:
   - Form fields:
     - **Name** (Full name with minimum length validation)
     - **Designation** (Job title with autocomplete suggestions)
     - **Location** (Work location / city)
     - **Salary** (Annual USD numeric validation)
   - Real-time form validation with clear error feedback.
   - Seamless submission that immediately registers the new employee into the directory.
   - Persistent storage using `localStorage` so new employees remain visible even after page reloads.
   - "Reset Form" button and success modal with direct navigation back to the Dashboard.

4. **Routing Structure ([App.jsx](file:///c:/Alvin/College/S3/ICT%20mern%20stack/src/App.jsx))**:
   - `/` : Employee Dashboard (Home)
   - `/home` : Employee Dashboard (Home)
   - `/employee-form` : Employee Registration Form
   - `*` : 404 Not Found Page

---

## 🛠️ Technology Stack

- **Frontend**: React (Vite)
- **Routing**: React Router DOM (`react-router-dom`)
- **Styling**: Bootstrap 5 + Custom Design System in [`src/index.css`](file:///c:/Alvin/College/S3/ICT%20mern%20stack/src/index.css)
- **Icons**: Lucide React
- **Typography**: Plus Jakarta Sans & Inter (Google Fonts)
- **Data Source**: JSONPlaceholder Users API

---

## 💻 How to Run Locally

```bash
# Install dependencies (if needed)
npm install

# Run the development server
npm run dev

# Build for production
npm run build
```

The application is accessible in your browser at: **`http://localhost:5173/`**
