from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
import httpx
import random
from datetime import datetime

app = FastAPI()

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Templates
templates = Jinja2Templates(directory="templates")

# Mystical responses
VIBES = {
    'positive': [
        "The stars align favorably in your repositories! ⭐",
        "Your code emanates powerful creative energy! 🌟",
        "The crystal ball shows a future bright with successful pull requests! 💫",
        "The cosmic forces suggest you're in a productive coding phase! 🌙",
    ],
    'neutral': [
        "The mists of time show balanced energy in your GitHub presence... 🌫️",
        "Your commits flow like a gentle stream, neither rushed nor stagnant... 🌊",
        "The cards suggest a time of steady, methodical progress... 🎴",
        "Your repository energies are in harmony with the digital realm... ⚖️",
    ],
    'needs_work': [
        "I sense some stagnant energy in your repositories... Time to push some code! 🔮",
        "The GitHub spirits whisper that you might need to collaborate more... 👻",
        "Your commit history suggests a need for renewed focus... 🎯",
        "The coding cosmos hints at untapped potential in your projects... ✨",
    ]
}

def calculate_github_mood(data):
    # Calculate activity score based on various factors
    current_year = datetime.now().year
    score = 0
    
    # Public repos bonus
    score += min(data['public_repos'] * 2, 20)
    
    # Followers bonus
    score += min(data['followers'] * 3, 30)
    
    # Account age bonus (up to 5 years)
    created_date = datetime.strptime(data['created_at'], '%Y-%m-%dT%H:%M:%SZ')
    account_age = current_year - created_date.year
    score += min(account_age * 5, 25)
    
    # Recent activity bonus (if bio and blog exist)
    if data['bio']:
        score += 10
    if data['blog']:
        score += 5
    
    # Normalize score to 0-100
    score = min(score, 100)
    
    # Determine mood category
    if score >= 70:
        return 'positive', random.choice(VIBES['positive'])
    elif score >= 40:
        return 'neutral', random.choice(VIBES['neutral'])
    else:
        return 'needs_work', random.choice(VIBES['needs_work'])

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse(
        "index.html",
        {"request": request}
    )

@app.get("/read/{username}")
async def read_github_energy(username: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"https://api.github.com/users/{username}")
        
        if response.status_code != 200:
            return {"error": "Could not connect to the GitHub spirits..."}
        
        data = response.json()
        mood_category, mood_message = calculate_github_mood(data)
        
        return {
            "username": username,
            "mood_category": mood_category,
            "mood_message": mood_message,
            "avatar_url": data["avatar_url"],
            "public_repos": data["public_repos"],
            "followers": data["followers"],
            "created_at": data["created_at"]
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)