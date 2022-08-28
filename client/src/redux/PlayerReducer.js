import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  players : [],
  time: 0,
}

export const applydoPlayersChange = createSlice({
  name: 'PLAYER',
  initialState,
  reducers: {
    doGetAllPlayers : (state, action) => {
      state.players = action.payload;
    },
    doDeletePlayer : (state, action) => {
      const NewListPlayers = state.players.filter((player) => player.id !== parseInt(action.payload))
      state.players = NewListPlayers;
    },
    doChangeTime : (state, action) => {
      state.time = action.payload;
    },
    doAddMsg : (state, action) => {
      let players =  [...state.players];
      let index = players.findIndex(x => x.id === parseInt(action.payload.id));
      if (index > -1) {
        console.log(index);
        if (players[index].msg.Messages) {
          // players[index].msg.id = action.payload.id;
          players[index].msg.Messages.push({msg: action.payload.msg, date: action.payload.date});
          state.players = players;
        }
        else {
          players[index].msg.Messages = []
          players[index].msg.id = action.payload.id;
          players[index].msg.Messages.push({msg: action.payload.msg, date: action.payload.date});
          state.players = players;
        }
      }
    },
  }
})

export const { doGetAllPlayers, doDeletePlayer, doChangeTime, doAddMsg } = applydoPlayersChange.actions

export default applydoPlayersChange.reducer
