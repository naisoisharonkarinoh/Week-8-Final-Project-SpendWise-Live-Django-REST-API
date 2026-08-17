# Week-8-Final-Project-SpendWise-Live-Django-REST-API

SpendWise (Django + DRF) Local Setup

1. Create a virtualenv and install requirements:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

2. Run migrations and create a user:

```powershell
python manage.py migrate
python manage.py createsuperuser
```

3. Run the dev server:

```powershell
python manage.py runserver
```

4. Open the frontend at `frontend/index.html` (serve as static file or open directly). The frontend talks to `http://localhost:8000/api/` by default.

Demo steps:
- Start server and create two users with different credentials.
- Login on frontend with user A, add an expense. Logout.
- Login with user B, confirm they don't see user A's expenses.

