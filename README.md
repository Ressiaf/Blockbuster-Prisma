# BLOCKBUSTER API  ⚡

    #Consigna del Trabajo
       
        Se te ha encargado el trabajo de crear un sistema de alquiler de películas. 
        
        El front end se va a enviar a otro equipo así que es imperativo que cumplas un estándar con tus respuestas porque sino llamara a problemas en el futuro.

        Para stockear las peliculas se usa la API ghibli https://ghibliapi.herokuapp.com/, necesitan stockear con estas películas y usar la información de esta API para sacar los detalles


    #Requerimientos

        1-Sistema de usuarios: Debe crearse un sistema donde se puedan registrar usuarios y hacer login y logout 


            Register  ✅
                    route : /api/users/register
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
                    route : /api/users/login
                    metodo: POST
                    data: ( "email, password" ) 
                    rec.body:
                        {
                            "email":"admin-alexis@avalith.com",
                            "password":"nodejs2022",
                            "role":"ADMIN"
                        } 


            Logout  ✅
                    route : api/users/logout
                    metodo: Get
                    data: token
                    rec.body:
                        {
                            "token" : 
                        } 


        2-Se debe poder buscar películas por nombre o por código, la información deberá salir desde la API


            Get movie by title ✅
                route: api/movies/search
                metodo: GET
                data: title
                rec.body
                    {
                        "title" : "Totoro"
                    }


            Get movie by Id ✅
                route: /movies/:id
                metodo: GET
                data: code
                req.params
                    {
                       /movies/2baf70d1-42bb-4437-b551-e5fed5a87abe
                    }
                    
        3-Sistema de alquiler: Se debe poder registrar un alquiler, actualizar el stock y luego poder registrar la devolución del alquiler, y mantener registro de las veces que una película fue alquilada


            Alquilar pelicula ✅
                route: /rents/:code
                metodo: POST
                data: code
                req.params
                    {
                       /rents/2baf70d1-42bb-4437-b551-e5fed5a87abe
                    }


            Devolver pelicula ✅
                route: /rents/:id
                metodo: PUT
                data: id
                req.params
                    {
                       /rents/1
                    }


            Peliculas alquiladas ✅
                route: /rents/user
                metodo: GET
                data: order
                req.params
                    {
                       /rents/user?order=desc
                    }
        

        4-Sistema de multas: Al devolver un alquiler se le envía al usuario el precio final del alquiler, que es dependiendo de la duración esperada del alquiler, si se pasa de esta fecha se le agrega un monto exponencial por cada día.


            Sistema de multas ✅
                route: /rents/:id
                metodo: PUT
                data: code
                req.params
                    {
                       /rents/1
                    }
                middleware : middlewares/rentPrice.js


        5-Sistema de favoritos: Los usuarios pueden registrar qué películas son sus favoritas y opcionalmente dejar una pequeña reseña


            Sistema de favoritos ✅
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
        

        6-Sistema de manejo de errores: Todos los errores deben estar atrapados y con los códigos pertinentes ✅


    #Especificaciones


        Al crearse la base de datos se debe poblar con todas las películas, cada película tendrá un stock de 5 por default ✅


        Toda información listable debe tener un endpoint para ser listada. Ej. Todas las películas, todas las películas alquiladas por un usuario, todas las películas favoritas de un usuario ✅


        Todo endpoint que devuelva una lista debe poder ordenarse en orden ascendente o descendente según un criterio a elección, el orden se debe pasar por query ✅


        El precio de un alquiler se determina por su tiempo esperado de alquiler, siendo el precio la cantidad de días * 10  ✅


        En caso de un atraso, la multa será exponencial y se multiplicará el precio del alquiler por 10% por cada dia de atraso. Ej. precio*1.1*diasDeRetraso  ✅


    #Test
        Los tests se podrán hacer con JEST o Mocha pero tendrán que cumplir con:
            -60% cobertura: Aceptable
            -80% cobertura: Deseado
    

    #Features opcionales
        1-Sistema de notificaciones: Notificar de vencimientos próximos al usuario al loguearse


        2-Sistema de mails: Mandar un mail al usuario al registrarse y poner un sistema de verificación


        3-Restocking: Implementar un usuario admin que pueda quitar y agregar stock y poder quitar películas del catálogo ✅


    Todo el trabajo debe ser entregado por github y debe tener un README.md que mencione todos los endpoints y su funcion pertinente ✅

    # Tecnologias utilizadas 
    NODEJS
▲ PRISMA