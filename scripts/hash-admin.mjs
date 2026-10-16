import { randomBytes, scryptSync } from 'node:crypto';
import { createInterface } from 'node:readline';
const prompt = createInterface({ input: process.stdin, output: process.stdout });
prompt.question('Local admin password (minimum 12 characters): ', password => {
 if(password.length<12){console.error('Password too short.');process.exitCode=1;prompt.close();return;}
 const salt=randomBytes(16).toString('hex');
 console.log('\nADMIN_PASSWORD_HASH='+salt+':'+scryptSync(password,salt,64).toString('hex'));
 console.log('SESSION_SECRET='+randomBytes(32).toString('hex'));
 prompt.close();
});
