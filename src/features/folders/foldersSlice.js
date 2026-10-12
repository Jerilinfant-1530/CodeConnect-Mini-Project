import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
const BASE=import.meta.env.VITE_API_URL||'http://localhost:3001';
async function req(path,method='GET',body){const r=await fetch(`${BASE}${path}`,{method,headers:{'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});if(!r.ok)throw Error(`Folders API ${r.status}`);return method==='DELETE'?null:r.json();}
export const fetchFolders=createAsyncThunk('folders/fetch',()=>req('/folders'));
export const createFolder=createAsyncThunk('folders/create',f=>req('/folders','POST',f));
export const renameFolder=createAsyncThunk('folders/rename',({id,name})=>req(`/folders/${encodeURIComponent(id)}`,'PATCH',{name}));
export const deleteFolder=createAsyncThunk('folders/delete',async id=>{await req(`/folders/${encodeURIComponent(id)}`,'DELETE');return id;});
const slice=createSlice({name:'folders',initialState:{items:[],status:'idle',error:null},reducers:{},extraReducers:b=>b.addCase(fetchFolders.fulfilled,(s,a)=>{s.items=a.payload;s.status='succeeded';}).addCase(createFolder.fulfilled,(s,a)=>{s.items.push(a.payload);}).addCase(renameFolder.fulfilled,(s,a)=>{const f=s.items.find(x=>x.id===a.payload.id);if(f)f.name=a.payload.name;}).addCase(deleteFolder.fulfilled,(s,a)=>{s.items=s.items.filter(x=>x.id!==a.payload);}).addMatcher(a=>a.type.startsWith('folders/')&&a.type.endsWith('/rejected'),(s,a)=>{s.error=a.error.message;s.status='failed';})});
export default slice.reducer;
