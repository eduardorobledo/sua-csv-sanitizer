# sua-csv-sanitizer
Small sanitizer for payroll reports exported to csv format from SUA (Sistema Único de Autodeterminación) a monolith system for social security management used in México IMSS version "V 3.5.6".

And the best of all: It's fee 😉

### Installation
Use a global installation to make it available everywhere 
```
$ npm install -g sua-csv-sanitizer
```

### Usage

After installing can use `sua-sanitize` command directly in the command line.

```
$ sua-sanitize
```
With no params this command will try to read every `.csv` file at the current path and output the sanitized csv lines directly to stdout.

```
$ sua-sanitize /path/to/folder
```
You can either specify a target folder to make the same process mentioned before.


```
$ sua-sanitize /path/to/single-file.csv
```
You can specify a single file as well

### About SUA CSV file format
If you are familiar with SUA system (http://www.imss.gob.mx/patrones/sua) version "V 3.5.6" you may already know that work with the exported xls, lotus, csv files are a complete mess. This tool can help you to sanitize only csv files so you can import the result back to you preferred spreadsheet and make your job easier.



### About the author
I'm a software developer with some free time.
If you have questions or comments about this software don't hesitate to reach me at GitHub channels
