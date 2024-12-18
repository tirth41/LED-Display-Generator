import pandas as pd

csv_file = r'./Screen.csv'
screen_df = pd.read_csv(csv_file)
json_output = r'./json_data/Screen.json'
ouput = screen_df.to_json(json_output,indent=1,orient='records')

csv_MFG_file = r'./MFG PART.csv'
mfg_df = pd.read_csv(csv_MFG_file)
msg_json_output = r'./json_data/MFG.json'
mfg_ouput = mfg_df.to_json(msg_json_output,indent=1,orient='records')

csv_MOUNT_file = r'./MOUNT.csv'
mount_df = pd.read_csv(csv_MOUNT_file)
mount_json_output = r'./json_data/MOUNT.json'
mount_ouput = mount_df.to_json(mount_json_output,indent=1,orient='records')

csv_Rec_file = r'./Receptacle.csv'
rec_df = pd.read_csv(csv_Rec_file)
rec_json_output = r'./json_data/REC.json'
rec_ouput = rec_df.to_json(rec_json_output,indent=1,orient='records')
