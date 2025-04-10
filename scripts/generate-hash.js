const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the password to hash: ', async (password) => {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    
    // Hash the password
    const hash = await bcrypt.hash(password, salt);
    
    console.log('\nBcrypt Hash:');
    console.log(hash);
    console.log('\nAdd this to your .env file as ADMIN_PASS_HASH=<hash>');
  } catch (error) {
    console.error('Error generating hash:', error);
  } finally {
    rl.close();
  }
}); 