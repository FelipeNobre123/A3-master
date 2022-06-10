

  mongoose.connect(`mongodb+srv://felipenobre:wrEvIrqQZiJWuTcK@cluster0.nfbpl.mongodb.net/?retryWrites=true&w=majority`)
.then( () => {
    app.listen(process.env.PORT || 4000)
    console.log('Conectou ao banco de dados!')
})
.catch((err) => console.log(err))
