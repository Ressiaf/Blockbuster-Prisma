# blockbusterExample API


    #Consigna del Trabajo
       
        Se te ha encargado el trabajo de crear un sistema de alquiler de películas. 
        
        El front end se va a enviar a otro equipo así que es imperativo que cumplas un estándar con tus respuestas porque sino llamara a problemas en el futuro.

        Para stockear las peliculas se usa la API ghibli https://ghibliapi.herokuapp.com/, necesitan stockear con estas películas y usar la información de esta API para sacar los detalles

    #Requerimientos

        1-Sistema de usuarios: Debe crearse un sistema donde se puedan registrar usuarios y hacer login y logout 

            Register  ✅
                    route : /register  
                    metodo: POST 
                    data: ( "email, dni, phone, password" ) 
                    rec.body:
                        {
                            "email":"admin-alexis@avalith.com",
                            "password":"nodejs2022",
                            "dni":"37896324",
                            "phone":"156237856"
                        }

            Login  ✅
                    route : npm 
                    metodo: Post
                    data: ( "email, password" ) 
                    rec.body:
                        {
                            "email":"admin@avalith.com"
                            "password":"nodejs2022",
                        } 

            Logout  ✅
                    route : /logout
                    metodo: Get
                    data: token
                    rec.body:
                        {
                            "token" : 
                        } 


        2-Se debe poder buscar películas por nombre o por código, la información deberá salir desde la API

            Get movie by title ✅
                route: /search
                metodo: Get
                data: title
                rec.body
                    {
                        "title" : "Totoro"
                    }

            Get movie by Id ✅
                route: /movies/:id
                metodo: Get
                data: id
                req.params
                    {
                       /movies/2baf70d1-42bb-4437-b551-e5fed5a87abe
                    }
                    
        3-Sistema de alquiler: Se debe poder registrar un alquiler, actualizar el stock y luego poder registrar la devolución del alquiler, y mantener registro de las veces que una película fue alquilada

            Alquilar pelicula ✅
                route: /rent/:code
                metodo: POST
                data: code
                req.params
                    {
                       /rent/2baf70d1-42bb-4437-b551-e5fed5a87abe
                    }

            Devolver pelicula ✅
                route: /rent/:id
                metodo: PUT
                data: code
                req.params
                    {
                       /rent/1
                    }

            Peliculas alquiladas ✅
                route: /rent/user
                metodo: GET
                req.params
                    {
                       /rent/user
                    }
        
        4-Sistema de multas: Al devolver un alquiler se le envía al usuario el precio final del alquiler, que es dependiendo de la duración esperada del alquiler, si se pasa de esta fecha se le agrega un monto exponencial por cada día.

            Sistema de multas ✅
                route: /rent/:code
                metodo: POST
                data: code
                req.params
                    {
                       /rent/2baf70d1-42bb-4437-b551-e5fed5a87abe
                    }
                middleware : middlewares/rentPrice.js

        5-Sistema de favoritos: Los usuarios pueden registrar qué películas son sus favoritas y opcionalmente dejar una pequeña reseña

            Sistema de favoritos 
                route: /favorites/:code
                metodo: POST
                data: code
                req.params
                    {
                       /favorites/2baf70d1-42bb-4437-b551-e5fed5a87abe
                    }
                req.body
                {
                    "review":"I absolutely adore all of the Ghibli films that I've seen, especially Howl's Moving Castle."
                }