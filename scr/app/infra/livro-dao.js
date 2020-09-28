class LivroDao{

    constructor(db){
        this._db = db;
    }

    lista(){
        return(new Promise((resolve, reject) => {

            this._db.all(
                'SELECT * FROM livros',
                (erro, resultado) => {
                    if(erro)
                        return(reject('Não foi possível listar'));
                    
                    return(resolve(resultado));
                }
            )
        }));
    }

    adiciona(livro){
        return(new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO LIVROS (
                        titulo,
                        preco,
                        descricao
                    ) values (?, ?, ?)
                `, 
                [   // TEM QUE ESTAR NA MESMA ORDEM
                    livro.titulo,
                    livro.preco,
                    livro.descricao
                ],
                function(erro){
                    if(erro){
                        console.log(erro);
                        return (reject('Não foi possível adicionar o livro'))
                    }

                    resolve();
                }

            );

        })) 

    };

    buscaPorId(id){
        return new Promise((resolve, reject) => {
            this._db.get(`
                SELECT *
                FROM livros
                WHERE id = ?            
            `,
                [id]
            ,
                (erro, livro) => {
                    if(erro){
                        console.log(erro);
                        return(reject('Não foi possível buscar o livro'));
                    }
                    return(resolve(livro));
                }
            )

       });

    };

    remove(id){
        return new Promise((resolve, reject) => {
            this._db.get(`
                DELETE 
                FROM livros
                WHERE id = ?
            
            `,
                [id]
            ,
                (erro) => {
                    if(erro){
                        console.log(erro);
                        return(reject('Não foi possível remover livro'));
                    }
                    return(resolve());
                }
            )
        })
    };


    atualiza(livro){
        return new Promise((resolve, reject) => {
            this._db.run(`
                UPDATE livros SET
                titulo = ?,
                preco = ?,
                descricao = ?
                WHERE id = ?
            `,
                [
                livro.titulo,
                livro.preco,
                livro.descricao,
                livro.id
                ]
            ,
                (erro) => {
                    if(erro){
                        console.log(erro);
                        return(reject('Não foi possivel atualizar o livro'))
                    }
                    return(resolve());
                }
            )
        });
    }
}

module.exports = LivroDao;

