from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from utils.auth import create_access_token, verify_password
from typing import Optional
from sqlalchemy.orm import Session
from database import get_db  # Función para obtener la sesión de la base de datos
from models import User  # Suponiendo que tienes un modelo User en tu ORM

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Modelo para usuario
class UserBase(BaseModel):
    username: str
    password: str

# Ruta para login
@router.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordBearer = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    # Consultar el usuario en la base de datos
    user = db.query(User).filter(User.username == form_data.username).first()
    
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Creación del token JWT con el tipo de usuario (1 para empleados, 2 para clientes)
    access_token = create_access_token(data={"sub": user.username, "tipo": user.tipo})
    
    return {"access_token": access_token, "token_type": "bearer"}
