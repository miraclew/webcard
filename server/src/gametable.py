'''
Created on 2011-6-22

@author: Administrator
'''

'''
玩家
'''
class Player:
    def __init__(self, player_id, socket):
        self.player_id = player_id
        self.socket = socket
        
'''
桌子
''' 
TS_FREE, TS_READY, TS_PLAYING = range(3)
   
class GameTable:
    def __init__(self,table_id,server):
        self.table_id = table_id
        self.server = server
        self.players = []
        self.status = TS_FREE
    
    def join(self, player):
        if len(self.players) >= self.server.game_player_count: 
            return False
        self.players.append(player)
    
    def leave(self, player):
        self.players.remove(player);
        
    def is_player_joined(self,player):
        return player in self.players
            

class GameServer:
    def __init__(self):
        self.table_count = 3
        self.game_name = '扑克'
        self.game_player_count = 2
        self.online_player_count = 0
        self.max_player_count = 0
        self.tables = []
        for i in range(self.table_count):
            self.tables.append(GameTable(i,self));
    
    def player_enter(self, player):
        for table in self.tables:
            if table.is_player_joined(player): return
        for table in self.tables:
            if len(table.players) <= self.game_player_count:
                table.join(player)
                return
            
    def player_exit(self, player):
        
        
'''
大厅
'''
class Lobby:
    def __init__(self):
        self.server = GameServer()
        self.players_dict = {}
    
    def login(self,player_id,password):
        if not self.players_dict.has_key(player_id):
            self.players_dict[player_id] = Player(player_id)
            self.server.player_enter(self.players_dict[player_id])
            
    def logout(self,player_id):
        if self.players_dict.has_key(player_id):
            del self.players_dict[player_id]                           
