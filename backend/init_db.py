#!/usr/bin/env python
"""
Инициализирует базу данных Django с примерами товаров и admin-аккаунтом
"""
import os
import sys
import django
from pathlib import Path

# Добавляем backend в path
sys.path.insert(0, str(Path(__file__).parent))

# Инициализируем Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ubaly.settings')
django.setup()

from django.core.management import call_command
from django.contrib.auth.models import User
from store.models import Product
import json

def main():
    print("=" * 60)
    print("Инициализация базы данных UBALY")
    print("=" * 60)
    
    print("\nПрименяю миграции...")
    try:
        call_command('migrate', '--noinput')
        print("Миграции применены успешно")
    except Exception as e:
        print(f"Ошибка при применении миграций: {e}")
        return False
    
    print("\nПроверяю admin-аккаунт...")
    if User.objects.filter(username='admin').exists():
        print("Admin-аккаунт уже существует (admin/admin)")
    else:
        try:
            User.objects.create_superuser(
                username='admin',
                email='admin@ubaly.local',
                password='admin'
            )
            print("Admin-аккаунт создан (admin/admin)")
            print("Измените пароль в /admin после первого запуска!")
        except Exception as e:
            print(f"Ошибка при создании admin: {e}")
    
    
    print("\n" + "=" * 60)
    print("Инициализация завершена!")
    print("=" * 60)
    print("\nДалее:")
    print("   1. Запустите фронтенд и бэкенд: npm run dev")
    print("   2. Откройте http://localhost:3000 - фронтенд")
    print("   3. Откройте http://localhost:8000/admin - админ-панель")
    print("   4. Логин: admin, Пароль: admin")
    print("   5. Добавьте товары через админ-панель")
    print("\n")

if __name__ == '__main__':
    main()
