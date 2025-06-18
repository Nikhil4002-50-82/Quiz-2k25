
# QuizMaster-2k25 🎓

**QuizMaster-2k25** is a full-stack web application designed for educational institutions to manage, conduct, and evaluate quizzes online. Teachers can create and manage quizzes, while students can take quizzes, track performance, and receive instant feedback.

> 🚀 Built with React, Supabase, and TailwindCSS

---

## 🧠 Features

### 👨‍🏫 For Teachers
- Secure authentication using Supabase
- Create quizzes with dynamic questions and options
- Set quiz duration and schedule
- View student performance reports

### 👨‍🎓 For Students
- View all available quizzes
- Attempt quizzes with a real-time timer
- Auto-submit on time completion
- View scores and quiz status instantly

### 📊 Performance Dashboard
- Track quiz history
- Analyze passed/failed status
- View scores in a clean tabular format

---

## 🔧 Tech Stack

| Frontend  | Backend  | Database | Auth & Storage |
|-----------|----------|----------|----------------|
| React     | Express (Optional) | Supabase | Supabase         |
| Tailwind CSS | Supabase Functions | PostgreSQL | Supabase Auth    |
| React Router |        |          | Supabase Storage |

---

## 📁 Folder Structure

```
quizmaster-2k25/
├── public/
├── src/
│   ├── components/
│   │   ├── Teacher/
│   │   ├── Student/
│   │   ├── common/
│   ├── context/
│   ├── pages/
│   ├── utils/
│   └── App.jsx
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Environment Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/quizmaster-2k25.git
   cd quizmaster-2k25
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` File**
   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_KEY=your-supabase-anon-key
   ```

4. **Start the App**
   ```bash
   npm run dev
   ```

---

## 🛠️ Database Schema (Supabase)

### `quizzes`
| Field        | Type       |
|--------------|------------|
| quiz_id      | UUID (PK)  |
| title        | Text       |
| description  | Text       |
| date         | Date       |
| time_limit   | Integer    |
| teacher_id   | UUID (FK)  |

### `questions`
| Field         | Type      |
|---------------|-----------|
| question_id   | UUID (PK) |
| quiz_id       | UUID (FK) |
| question_text | Text      |
| question_type | Text      |

### `options`
| Field        | Type      |
|--------------|-----------|
| option_id    | UUID (PK) |
| question_id  | UUID (FK) |
| option_text  | Text      |
| is_correct   | Boolean   |

---

## 💡 Future Improvements

- Admin panel for overall quiz management
- Detailed analytics dashboard for teachers
- Notification system for upcoming quizzes
- Mobile responsiveness & PWA support

---

## 🤝 Contribution

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -am 'Add feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.

---

## ✨ Acknowledgements

- [Supabase](https://supabase.com/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 📬 Contact

**Author:** Nikhil  
📧 Email: your-email@example.com  
🌐 Portfolio: [your-portfolio-link](https://your-portfolio.com)
