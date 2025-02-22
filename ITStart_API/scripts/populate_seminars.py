import os
import json
from datetime import datetime
from api.models import Seminar


def run():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.join(base_dir, "../seminars.json")

    try:
        with open(json_path, encoding='utf-8') as file:
            data = json.load(file)
            for seminar in data['seminars']:
                formatted_date = datetime.strptime(seminar['date'], "%d.%m.%Y").strftime("%Y-%m-%d")
                Seminar.objects.create(
                    title=seminar['title'],
                    description=seminar['description'],
                    date=formatted_date,
                    time=seminar['time'],
                    photo=seminar['photo']
                )
        print("✅ Database populated successfully!")

    except Exception as e:
        print(f"Error: {e}")
