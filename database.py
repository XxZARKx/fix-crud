from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Configura tu conexión con FreeSQLDatabase
load_dotenv()
DATABASE_URL = (
    "mysql+pymysql://sql10748603:2lKyHhlCND@sql10.freesqldatabase.com/sql10748603"
)

# Crear el motor de conexión
engine = create_engine(DATABASE_URL)

# Crear una sesión
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para los modelos
Base = declarative_base()
