import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
async function request(path, options={}) { const res=await fetch(`${BASE}${path}`,options); if(!res.ok) throw new Error(`API ${res.status}: ${path}`); return res.status===204 ? null : res.json(); }
const json=(method,data)=>({method,headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
export const fetchFiles=createAsyncThunk('files/fetch',async()=>request('/files'));
export const createFileAPI=createAsyncThunk('files/create',async(file)=>request('/files',json('POST',file)));
export const updateFileAPI=createAsyncThunk('files/update',async({id,changes})=>request(`/files/${encodeURIComponent(id)}`,json('PATCH',changes)));
export const deleteFileAPI=createAsyncThunk('files/delete',async(id)=>{await request(`/files/${encodeURIComponent(id)}`,{method:'DELETE'});return id;});
const initialState={items:[],status:'idle',error:null};
const slice=createSlice({name:'files',initialState,reducers:{updateFile:(state,action)=>{const f=state.items.find(x=>x.id===action.payload.id);if(f) f.content=action.payload.content;}},extraReducers:b=>b
.addCase(fetchFiles.pending,s=>{s.status='loading';s.error=null;})
.addCase(fetchFiles.fulfilled,(s,a)=>{s.status='succeeded';s.items=a.payload;s.error=null;})
.addCase(createFileAPI.fulfilled,(s,a)=>{s.items.push(a.payload);s.error=null;})
.addCase(updateFileAPI.fulfilled,(s,a)=>{const f=s.items.find(x=>x.id===a.payload.id);if(f){if('name' in a.meta.arg.changes) f.name=a.payload.name;if('folderId' in a.meta.arg.changes) f.folderId=a.payload.folderId;}s.error=null;})
.addCase(deleteFileAPI.fulfilled,(s,a)=>{s.items=s.items.filter(x=>x.id!==a.payload);s.error=null;})
.addMatcher(a=>a.type.startsWith('files/')&&a.type.endsWith('/rejected'),(s,a)=>{s.error=a.error.message;s.status='failed';})});
export const {updateFile}=slice.actions;export default slice.reducer;
