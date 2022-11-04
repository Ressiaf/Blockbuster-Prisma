# blockbusterExample API


    #Consigna del Trabajo
       
        Se te ha encargado el trabajo de crear un sistema de alquiler de películas. 
        
        El front end se va a enviar a otro equipo así que es imperativo que cumplas un estándar con tus respuestas porque sino llamara a problemas en el futuro.

        Para stockear las peliculas se usa la API ghibli https://ghibliapi.herokuapp.com/, necesitan stockear con estas películas y usar la información de esta API para sacar los detalles

    #Requerimientos

        1-Sistema de usuarios: Debe crearse un sistema donde se puedan registrar usuarios y hacer login y logout 

            Register  ✅
                    route : /register  
                    metodo: Post 
                    data: ( "email, dni, phone, password" ) 
                    rec.body:
                        {
                            "email":"admin-alexis@avalith.com",
                            "password":"nodejs2022",
                            "dni":"37896324",
                            "phone":"156237856"
                        }

            Login  ✅
                    route : /login
                    metodo: Post
                    data: ( "email, password" ) 
                    rec.body:
                        {
                            "email":"admin@avalith.com"
                            "dni":"37896324"
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

            Alquilar ✅
                route: /rent/:code
                metodo: POST
                data: code
                req.params
                    {
                       /rent/2baf70d1-42bb-4437-b551-e5fed5a87abe
                    }

            Devolver ?

            Peliculas alquiladas ✅
                route: /rent/user
                metodo: GET
                req.params
                    {
                       /rent/user
                    }