import firebase_admin
from firebase_admin import credentials, firestore, auth
from flask import Flask, render_template, redirect, url_for, request
from firebase_admin import auth,storage
app=Flask(__name__)
app.secret_key="123"

cred = credentials.Certificate("firebase.json")
firebase_admin.initialize_app(cred, {
    'storageBucket': 'cloud-842e8.appspot.com'
})
db = firestore.client()
collection = db.collection("users")
bucket = storage.bucket()

@app.route("/")

def home():
    return render_template("index.html")

@app.route("/register",methods=['GET','POST'])

def register():
    if request.method=="POST":
            name=request.form.get('name')
            mail=request.form.get('mail')
            password=request.form.get('password')
            doc1=collection.document(mail).get()
            if not doc1.exists:
                doc=collection.document(mail).set({
                    'name':name,
                    'mail':mail,
                    'password':password
                })
                data="registered successflly"
                return render_template("index.html",data1=data,color="green")
            else:
                data="email id already exists"
                return render_template("index.html",data1=data,color="green")
    return render_template("/index.html")

@app.route("/login", methods=['POST'])
def login():
   if request.method=="POST":
        mail = request.form.get('mail')
        password = request.form.get('password')
        doc=collection.where('mail','==',mail).where('password','==',password).get()
        if doc:
            return render_template("index.html",data2="login successful")
        else:
            return render_template("index.html",data2="invalid login") 
        return render_template("index.html")

@app.route("/update",methods=['GET','POST'])

def update():
    if request.method=="POST":
        mail = request.form.get('mail')
        password = request.form.get('password')
        doc=collection.document(mail).update({
            'password':password
        })
        return render_template('index.html',data3="updated")
    return render_template("index.html")
@app.route("/fetch", methods=['GET', 'POST'])
def fetch():
    docs = collection.get()
    users_data = [] 
    for doc in docs:
        users_data.append(doc.to_dict())
    return render_template("index.html", data=users_data)

@app.route("/upload",methods=['GET','POST'])
def upload():
    if 'file' not in request.files:
        return "file not uploaded"
    file=request.files['file']
    blob = bucket.blob(file.filename)
    blob.upload_from_file(file)
    return 'File uploaded successfully'


if __name__=="__main__":
    app.run(debug=True)