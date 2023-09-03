const { program } = require("commander");
const fs = require("fs/promises");
const chalk = require("chalk");
const QUOTE_FILE = "quotes.txt";

program
  .name("quotes")
  .description("CLI tool for inspiration")
  .version("0.1.0");

program
  .command("getQuote")
  .description("Retrieves a random quote")
  .action(async () => {
    // TODO: Pull a random quote from the quotes.txt file
    try {
      const quotesData = await fs.readFile(QUOTE_FILE, `utf-8`);
      const lineBreak = quotesData.split(`\n`);
        console.log(lineBreak)
      const randomQuote = lineBreak[Math.floor(Math.random() * lineBreak.length)];
      const randomQuoteSelection = randomQuote.split(`|`)[0];
    // console log the quote and author
    // You may style the text with chalk as you wish
        console.log(chalk.yellow.bold(randomQuoteSelection));
      
    }catch (err){
      const error = chalk.red.bold
      console.log(error('Error!'));
    }
});

program
  .command("addQuote <quote> [author]")
  .description("adds a quote to the quote file")
  .action(async (quote, author) => {
  
    // TODO: Add the quote and author to the quotes.txt file
    try {
      // If no author is provided,
      // save the author as "Anonymous".
      if (!author) {
        const anonymous = "Anonymous" ;
        const unknownAuthor = fs.appendFile(QUOTE_FILE, ["\n" + quote + "|" + anonymous]);
      // After the quote/author is saved,
      // alert the user that the quote was added.
          console.log(`${chalk.yellow(quote)} - ${chalk.white(unknownAuthor)}`);
          console.log(chalk.magenta('Quote added successfully!'));
          
      }else if (author){
        // If author is provided - saves author's name
        // alert the user that the quote was added.
        const knownAuthor = await fs.appendFile(QUOTE_FILE, ["\n" + quote + "|" + author])
        console.log(`${chalk.yellow(quote)} - ${chalk.white(author)}`);
        console.log(chalk.magenta('Quote added successfully!'));
      }

        } catch (err){
          const error = chalk.red.bold
          console.log(error('Error!'));
      }
    });  
      
  

program.parse();
