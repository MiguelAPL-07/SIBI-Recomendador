import random
from datetime import datetime
import pandas as pd


# Genera fecha aleatoria entre el rango incio y final

inicio = datetime(2023, 2, 1)
final = datetime(2023, 12, 31)

# Creamos las listas donde vamos a guardar la informacion
concertID = list()
listName = list()
listDate = list()
listHourStart = list()
listRoom = list()
listCity = list()
listPrice = list()
listGenre = list()
listArtist = list()

#Imprime la información de los equipos y de los puntos
listaArtistasPop = ["Manuel Carrasco", "Dani Martin", "David Bisbal", "Melendi", "Alex Ubago",
                     "Ajeandro Sanz", "Pablo Lopez", "Chanel Terrero", "David Bustamante", "Blas Cantó",
                     "Alvaor Soler", "Nil Moliner", "Cepeda", "Vanesa Martin", "Antonio Orozco",
                     "Conchita", "Marc Segui", "Pol Granch", "Pole.", "Beret"]
listaArtistasFlamenco = ["C.Tangana", "Omar Montes", "India Martinez", "Estopa",
                         "Diego El Cigala", "El Barrio", "Joaquin Sabina", "Niña Pastori", "Los Delinquentes",
                         "Arcangel", "Paco de Lucia", "Gipsy Kings", "Fondo Flamenco", "Daviles de Novelda",
                         "Camela", "Los chichos", "Los chunguitos", "Los Rebujitos", "Elena Vargas"]
listaArtistasRock = ["Fito y Fitipaldis", "Talco", "Desakato", "SKA-P", "Boikot",
                     "Celtas Cortos", "Tanxugueiras", "Los de Marras", "La Fuga", "Sinkope",
                     "Porretas", "Kaotiko", "Mago de Oz", "Ciudad Jara", "Valira",
                     "Extremoduro", "El ultimo que cierre", "Los planetas", "Vetusta morla", "M clan"]
listaArtistasIndie = ["Leiva", "La M.O.D.A", "Lori Meyers", "Vetusta Morla", "IZAL",
                      "Love Of Lesbian", "Dorian", "Supersubmarina", "Viva Suecia", "Sidonie",
                      "Taburete", "Macaco", "Sidecars", "La Pegatina", "Rulo y la Contrabanda",
                      "Carlos Sadness", "Shinova", "Rozalen", "Miss Cafeina", "Ivan Ferreiro"]
listaArtistasMetal = ["Corvus V", "Black Bomber", "Sober", "Deshonra", "The Broken Horizon",
                      "Metalica", "Guns N Roses", "Pink Floyd", "AC/DC", "Nirvana"]
listaArtistasLatino = ["Marc Anthony", "J Balvin", "Jennifer Lopez", "Juanes", "Maluma",
                       "Anuel AA", "Freid", "Ozuna", "Camilo", "Myke Towers",
                       "RVFV", "Justin Quiles", "Ovy On The Drums", "Bad Bunny", "Eladio Carrion",
                       "Nicky Jam", "CNCO", "Morat", "Plan B", "Bandaga"]
listaArtistasHipHop = ["Nikone", "Natos y Waor", "FERNANDOCOSTA", "Recycled J", "Ajax y Prok",
                       "Israel B", "Young Beef", "Morad", "Rels B", "Duki",
                       "Kase. O", "Los Chikos del Maiz", "Nach", "Violadores del Verso", "Chojin",
                       "SFDK", "Delaossa", "Mala Rodriguez", "Tote King", "Rayden"]
listaArtistasReggaeton = ["Enrique Iglesias", "Juan Magan", "DaSoul", "Ana Mena", "Rosalia",
                          "Lola Indigo", "Bad Gyal", "Danny Romero", "Daddy Yankee", "Don Omar",
                          "Shakira", "Quevedo", "Luis Fonsi", "Karol G", "Ricky Martin",
                          "Raw Alejandro", "Sebastian Yatra", "Mora", "Ryan Castro", "Tiago PZK"]
listaArtistasBachata = ["Manuel Turizo", "Romeo Santos", "Prince Roys", "Luis Vargas", "Daniel Santacruz"]
listaArtistasDembow = ["El Cherry Scom", "Lirico en la Casa", "El Alfa", "Farruko", "Miky Woodz"]

listaSalas = [["Espacio Vias", "Leon"], ["Palau Sant Jordi", "Barcelona"], ["Plaza de Toros", "Roquetas de Mar"],
              ["Estadio Jose Copete", "Albacete"], ["Noches de la Maestranza", "Sevilla"],
              ["Gran Canaria Arena", "Las Palmas de Gran Canaria"], ["Recinto Ferial", "Santa Cruz de Tenerife"],
              ["Palacio de Deportes Martín Carpena", "Malaga"], ["Palacio de Toros", "Alicante"],
              ["Plaza de Toros", "Leon"], ["WiZink Center", "Madrid"], ["Coliseum", "A Coruña"],
              ["Plaza de Toros", "Valencia"], ["Plaza de Toros", "Murcia"], ["Navarra Arena", "Pamplona"],
              ["Estadio La Cartuja", "Sevilla"], ["Estadio Iberoamericano", "Huelva"],
              ["Pabellon de la Magdalena", "Aviles"], ["Campo de Futbol", "Almendralñejo"], ["Muelle Ciudad", "Cadiz"],
              ["Trui Son Fusteret", "Mallorca"], ["Bilbao Miribilla", "Bilbao"], [" Santa María Polo Club", "Sotogrande"],
              ["Marenostrum Fuengirola", "Fuengirola"], ["Centro Hipico", "Mairena del Aljarafe"],
              ["Sala Capitol", "Santiago de Compostela"], ["Palacio de Congresos", "Leon"], ["La Iguana Club", "Vigo"],
              ["Auditorio de Ponferrada", "Ponferrada"], ["Civitas Metropolitano", "Madrid"],
              ["La cubierta de Leganes", "Leganes"], ["Sala Karma", "Pontevdra"], ["Sala Caracol", "Madrid"],
              ["Black Note Club", "Valencia"], ["Auditorio de Zaragoza", "Zaragoza"],
              ["Auditorio Marbella Arena", "Marbella"], ["Coliseum Burgos", "Burgos"],
              ["Estadio la Romareda", "Zaragoza"], ["Plaza de Toros de Las Ventas", "Madrid"], ["Sala Studio 54", "Leon"]]

listaArtistas = [["Espacio Vias", "Madrid"], ["Pabellon de Deportes", "Leon"]]

horasDisponibles = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
                    "21:00", "22:00", "23:00", "00:00", "01:00", "02:00", "03:00", "04:00"]

# Contador para el concertID
id = 1

# Lista Artistas Pop
count = 0
for i in listaArtistasPop:
    if count < len(listaArtistasPop):
        contConciertos = 0
        for j in listaArtistasPop:
            if contConciertos < 20:
                # ConcertID
                concertID.append(id)
                # Name
                name = listaArtistasPop[count]
                # Date
                random_date = inicio + (final - inicio) * random.random()
                date = str(random_date.day) + "-" + str(random_date.month) + "-" + str(random_date.year)
                # HourStart
                numero1 = random.randint(0, (len(horasDisponibles) - 1))
                hourStart = horasDisponibles[numero1]
                # Room
                numero2 = random.randint(0, (len(listaSalas) - 1))
                sala = listaSalas[numero2][1]
                # City
                ciudad = listaSalas[numero2][0]
                # Price
                numero3 = random.randint(0, 70)
                precio = numero3
                # Genre
                genero = "Pop"
                # Artist
                artista = listaArtistasPop[count]

                listName.append(name)
                listDate.append(date)
                listHourStart.append(hourStart)
                listRoom.append(sala)
                listCity.append(ciudad)
                listPrice.append(precio)
                listGenre.append(genero)
                listArtist.append(artista)
                print(str(id) + " " + name + " " + date + " " + str(numero1) + " " + hourStart + " " + str(numero2) +
                      " " + sala + " " + ciudad + " " + str(numero3) + " " + str(precio) + " " + genero + " " + artista)
                id += 1
            else:
                break
            contConciertos += 1
    else:
        break
    count += 1


# Lista Artistas Flamenco
count = 0
for i in listaArtistasFlamenco:
    if count < len(listaArtistasFlamenco):
        contConciertos = 0
        for j in listaArtistasFlamenco:
            if contConciertos < 20:
                # ConcertID
                concertID.append(id)
                # Name
                name = listaArtistasFlamenco[count]
                # Date
                random_date = inicio + (final - inicio) * random.random()
                date = str(random_date.day) + "-" + str(random_date.month) + "-" + str(random_date.year)
                # HourStart
                numero1 = random.randint(0, (len(horasDisponibles) - 1))
                hourStart = horasDisponibles[numero1]
                # Room
                numero2 = random.randint(0, (len(listaSalas) - 1))
                sala = listaSalas[numero2][1]
                # City
                ciudad = listaSalas[numero2][0]
                # Price
                numero3 = random.randint(0, 70)
                precio = numero3
                # Genre
                genero = "Flamenco"
                # Artist
                artista = listaArtistasFlamenco[count]

                listName.append(name)
                listDate.append(date)
                listHourStart.append(hourStart)
                listRoom.append(sala)
                listCity.append(ciudad)
                listPrice.append(precio)
                listGenre.append(genero)
                listArtist.append(artista)

                print(str(id) + " " + name + " " + date + " " + str(numero1) + " " + hourStart + " " + str(numero2) +
                      " " + sala + " " + ciudad + " " + str(numero3) + " " + str(precio) + " " + genero + " " + artista)
                id += 1
            else:
                break
            contConciertos += 1
    else:
        break
    count += 1


    # Lista Artistas Rock
count = 0
for i in listaArtistasRock:
    if count < len(listaArtistasRock):
        contConciertos = 0
        for j in listaArtistasRock:
            if contConciertos < 20:
                # ConcertID
                concertID.append(id)
                # Name
                name = listaArtistasRock[count]
                # Date
                random_date = inicio + (final - inicio) * random.random()
                date = str(random_date.day) + "-" + str(random_date.month) + "-" + str(random_date.year)
                # HourStart
                numero1 = random.randint(0, (len(horasDisponibles) - 1))
                hourStart = horasDisponibles[numero1]
                # Room
                numero2 = random.randint(0, (len(listaSalas) - 1))
                sala = listaSalas[numero2][1]
                # City
                ciudad = listaSalas[numero2][0]
                # Price
                numero3 = random.randint(0, 70)
                precio = numero3
                # Genre
                genero = "Rock"
                # Artist
                artista = listaArtistasRock[count]

                listName.append(name)
                listDate.append(date)
                listHourStart.append(hourStart)
                listRoom.append(sala)
                listCity.append(ciudad)
                listPrice.append(precio)
                listGenre.append(genero)
                listArtist.append(artista)

                print(str(id) + " " + name + " " + date + " " + str(numero1) + " " + hourStart + " " + str(numero2) +
                      " " + sala + " " + ciudad + " " + str(numero3) + " " + str(precio) + " " + genero + " " + artista)
                id += 1
            else:
                break
            contConciertos += 1
    else:
        break
    count += 1

# Lista Artistas Indie
count = 0
for i in listaArtistasIndie:
    if count < len(listaArtistasIndie):
        contConciertos = 0
        for j in listaArtistasIndie:
            if contConciertos < 20:
                # ConcertID
                concertID.append(id)
                # Name
                name = listaArtistasIndie[count]
                # Date
                random_date = inicio + (final - inicio) * random.random()
                date = str(random_date.day) + "-" + str(random_date.month) + "-" + str(random_date.year)
                # HourStart
                numero1 = random.randint(0, (len(horasDisponibles) - 1))
                hourStart = horasDisponibles[numero1]
                # Room
                numero2 = random.randint(0, (len(listaSalas) - 1))
                sala = listaSalas[numero2][1]
                # City
                ciudad = listaSalas[numero2][0]
                # Price
                numero3 = random.randint(0, 70)
                precio = numero3
                # Genre
                genero = "Indie"
                # Artist
                artista = listaArtistasIndie[count]

                listName.append(name)
                listDate.append(date)
                listHourStart.append(hourStart)
                listRoom.append(sala)
                listCity.append(ciudad)
                listPrice.append(precio)
                listGenre.append(genero)
                listArtist.append(artista)

                print(str(id) + " " + name + " " + date + " " + str(numero1) + " " + hourStart + " " + str(numero2) +
                      " " + sala + " " + ciudad + " " + str(numero3) + " " + str(precio) + " " + genero + " " + artista)
                id += 1
            else:
                break
            contConciertos += 1
    else:
        break
    count += 1

# Lista Artistas metal
count = 0
for i in listaArtistasMetal:
    if count < len(listaArtistasMetal):
        contConciertos = 0
        for j in listaArtistasMetal:
            if contConciertos < 10:
                # ConcertID
                concertID.append(id)
                # Name
                name = listaArtistasMetal[count]
                # Date
                random_date = inicio + (final - inicio) * random.random()
                date = str(random_date.day) + "-" + str(random_date.month) + "-" + str(random_date.year)
                # HourStart
                numero1 = random.randint(0, (len(horasDisponibles) - 1))
                hourStart = horasDisponibles[numero1]
                # Room
                numero2 = random.randint(0, (len(listaSalas) - 1))
                sala = listaSalas[numero2][1]
                # City
                ciudad = listaSalas[numero2][0]
                # Price
                numero3 = random.randint(0, 70)
                precio = numero3
                # Genre
                genero = "Metal"
                # Artist
                artista = listaArtistasMetal[count]

                listName.append(name)
                listDate.append(date)
                listHourStart.append(hourStart)
                listRoom.append(sala)
                listCity.append(ciudad)
                listPrice.append(precio)
                listGenre.append(genero)
                listArtist.append(artista)

                print(str(id) + " " + name + " " + date + " " + str(numero1) + " " + hourStart + " " + str(numero2) +
                      " " + sala + " " + ciudad + " " + str(numero3) + " " + str(precio) + " " + genero + " " + artista)
                id += 1
            else:
                break
            contConciertos += 1
    else:
        break
    count += 1

# Lista Artistas Latino
count = 0
for i in listaArtistasLatino:
    if count < len(listaArtistasLatino):
        contConciertos = 0
        for j in listaArtistasLatino:
            if contConciertos < 20:
                # ConcertID
                concertID.append(id)
                # Name
                name = listaArtistasLatino[count]
                # Date
                random_date = inicio + (final - inicio) * random.random()
                date = str(random_date.day) + "-" + str(random_date.month) + "-" + str(random_date.year)
                # HourStart
                numero1 = random.randint(0, (len(horasDisponibles) - 1))
                hourStart = horasDisponibles[numero1]
                # Room
                numero2 = random.randint(0, (len(listaSalas) - 1))
                sala = listaSalas[numero2][1]
                # City
                ciudad = listaSalas[numero2][0]
                # Price
                numero3 = random.randint(0, 70)
                precio = numero3
                # Genre
                genero = "Latino"
                # Artist
                artista = listaArtistasLatino[count]

                listName.append(name)
                listDate.append(date)
                listHourStart.append(hourStart)
                listRoom.append(sala)
                listCity.append(ciudad)
                listPrice.append(precio)
                listGenre.append(genero)
                listArtist.append(artista)

                print(str(id) + " " + name + " " + date + " " + str(numero1) + " " + hourStart + " " + str(numero2) +
                      " " + sala + " " + ciudad + " " + str(numero3) + " " + str(precio) + " " + genero + " " + artista)
                id += 1
            else:
                break
            contConciertos += 1
    else:
        break
    count += 1

# Lista Artistas HipHop
count = 0
for i in listaArtistasHipHop:
    if count < len(listaArtistasHipHop):
        contConciertos = 0
        for j in listaArtistasHipHop:
            if contConciertos < 20:
                # ConcertID
                concertID.append(id)
                # Name
                name = listaArtistasHipHop[count]
                # Date
                random_date = inicio + (final - inicio) * random.random()
                date = str(random_date.day) + "-" + str(random_date.month) + "-" + str(random_date.year)
                # HourStart
                numero1 = random.randint(0, (len(horasDisponibles) - 1))
                hourStart = horasDisponibles[numero1]
                # Room
                numero2 = random.randint(0, (len(listaSalas) - 1))
                sala = listaSalas[numero2][1]
                # City
                ciudad = listaSalas[numero2][0]
                # Price
                numero3 = random.randint(0, 70)
                precio = numero3
                # Genre
                genero = "HipHop"
                # Artist
                artista = listaArtistasHipHop[count]

                listName.append(name)
                listDate.append(date)
                listHourStart.append(hourStart)
                listRoom.append(sala)
                listCity.append(ciudad)
                listPrice.append(precio)
                listGenre.append(genero)
                listArtist.append(artista)

                print(str(id) + " " + name + " " + date + " " + str(numero1) + " " + hourStart + " " + str(numero2) +
                      " " + sala + " " + ciudad + " " + str(numero3) + " " + str(precio) + " " + genero + " " + artista)
                id += 1
            else:
                break
            contConciertos += 1
    else:
        break
    count += 1

# Lista Artistas Reggaeton
count = 0
for i in listaArtistasReggaeton:
    if count < len(listaArtistasReggaeton):
        contConciertos = 0
        for j in listaArtistasReggaeton:
            if contConciertos < 20:
                # ConcertID
                concertID.append(id)
                # Name
                name = listaArtistasReggaeton[count]
                # Date
                random_date = inicio + (final - inicio) * random.random()
                date = str(random_date.day) + "-" + str(random_date.month) + "-" + str(random_date.year)
                # HourStart
                numero1 = random.randint(0, (len(horasDisponibles) - 1))
                hourStart = horasDisponibles[numero1]
                # Room
                numero2 = random.randint(0, (len(listaSalas) - 1))
                sala = listaSalas[numero2][1]
                # City
                ciudad = listaSalas[numero2][0]
                # Price
                numero3 = random.randint(0, 70)
                precio = numero3
                # Genre
                genero = "Reggaeton"
                # Artist
                artista = listaArtistasReggaeton[count]

                listName.append(name)
                listDate.append(date)
                listHourStart.append(hourStart)
                listRoom.append(sala)
                listCity.append(ciudad)
                listPrice.append(precio)
                listGenre.append(genero)
                listArtist.append(artista)

                print(str(id) + " " + name + " " + date + " " + str(numero1) + " " + hourStart + " " + str(numero2) +
                      " " + sala + " " + ciudad + " " + str(numero3) + " " + str(precio) + " " + genero + " " + artista)
                id += 1
            else:
                break
            contConciertos += 1
    else:
        break
    count += 1

# Lista Artistas Bachata
count = 0
for i in listaArtistasBachata:
    if count < len(listaArtistasBachata):
        contConciertos = 0
        for j in listaArtistasBachata:
            if contConciertos < 5:
                # ConcertID
                concertID.append(id)
                # Name
                name = listaArtistasBachata[count]
                # Date
                random_date = inicio + (final - inicio) * random.random()
                date = str(random_date.day) + "-" + str(random_date.month) + "-" + str(random_date.year)
                # HourStart
                numero1 = random.randint(0, (len(horasDisponibles) - 1))
                hourStart = horasDisponibles[numero1]
                # Room
                numero2 = random.randint(0, (len(listaSalas) - 1))
                sala = listaSalas[numero2][1]
                # City
                ciudad = listaSalas[numero2][0]
                # Price
                numero3 = random.randint(0, 70)
                precio = numero3
                # Genre
                genero = "Bachata"
                # Artist
                artista = listaArtistasBachata[count]

                listName.append(name)
                listDate.append(date)
                listHourStart.append(hourStart)
                listRoom.append(sala)
                listCity.append(ciudad)
                listPrice.append(precio)
                listGenre.append(genero)
                listArtist.append(artista)

                print(str(id) + " " + name + " " + date + " " + str(numero1) + " " + hourStart + " " + str(numero2) +
                      " " + sala + " " + ciudad + " " + str(numero3) + " " + str(precio) + " " + genero + " " + artista)
                id += 1
            else:
                break
            contConciertos += 1
    else:
        break
    count += 1

# Lista Artistas Dembow
count = 0
for i in listaArtistasDembow:
    if count < len(listaArtistasDembow):
        contConciertos = 0
        for j in listaArtistasDembow:
            if contConciertos < 5:
                # ConcertID
                concertID.append(id)
                # Name
                name = listaArtistasDembow[count]
                # Date
                random_date = inicio + (final - inicio) * random.random()
                date = str(random_date.day) + "-" + str(random_date.month) + "-" + str(random_date.year)
                # HourStart
                numero1 = random.randint(0, (len(horasDisponibles) - 1))
                hourStart = horasDisponibles[numero1]
                # Room
                numero2 = random.randint(0, (len(listaSalas) - 1))
                sala = listaSalas[numero2][1]
                # City
                ciudad = listaSalas[numero2][0]
                # Price
                numero3 = random.randint(0, 70)
                precio = numero3
                # Genre
                genero = "Dembow"
                # Artist
                artista = listaArtistasDembow[count]

                listName.append(name)
                listDate.append(date)
                listHourStart.append(hourStart)
                listRoom.append(sala)
                listCity.append(ciudad)
                listPrice.append(precio)
                listGenre.append(genero)
                listArtist.append(artista)

                print(str(id) + " " + name + " " + date + " " + str(numero1) + " " + hourStart + " " + str(numero2) +
                      " " + sala + " " + ciudad + " " + str(numero3) + " " + str(precio) + " " + genero + " " + artista)
                id += 1
            else:
                break
            contConciertos += 1
    else:
        break
    count += 1

# Se crea un DataFrame con los datos y un indice
df = pd.DataFrame({'concertID': concertID, 'name': listName, 'date': listDate, 'hourStart': listHourStart, 'room': listRoom, 'city': listCity, 'price': listPrice, 'genre': listGenre, 'artist': listArtist}, index=list(range(1,2912)))

# Imprime el DataFrame con la información obtenida relacionada
print(df)

# Exportams la información obtenida a un archivo .csv
df.to_csv('concerts.csv', index=False)