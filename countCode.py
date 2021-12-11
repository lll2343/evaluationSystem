#统计代码量，显示离10W行代码还有多远
#递归搜索各个文件夹
#显示各个类型的源文件和源代码数量
#显示总行数与百分比

import os
import easygui as g


#查找文件
def find_file(file_path,target):
    os.chdir(file_path)
    all_files=os.listdir(os.curdir)
    for each in all_files:
        #print(each)
        fext=os.path.splitext(each)[1]
        if fext in target:
            lines=calc_code(each) #统计行数
            #print("文件%s的代码行数是%d"%(each,lines))
            #统计文件数
            try:
                file_list[fext]+=1
            except KeyError:
                file_list[fext]=1
            #统计源代码行数
            try:
                source_list[fext] += lines
                #print(source_list[fext])
            except KeyError:
                source_list[fext] = lines
                #print(source_list[fext])


        if os.path.isdir(each):
            find_file(each,target) # 递归调用
            os.chdir(os.pardir) #返回上层目录


#统计行数
def calc_code(file_name):
    lines=0
    # if '.py' in file_name:
    #     print(file_name)
    with open(file_name,encoding='gb18030',errors='ignore') as f:
        print("正在分析文件%s..."%file_name)
        try:
            for eachline in f:
                if not eachline.strip() or eachline.startswith('#') or eachline.startswith('//'):
                    # if not eachline.strip():
                    #     a = eachline.strip()
                    #     print(a)
                    continue
                lines += 1
        except UnicodeDecodeError:
            pass
        print("文件%s分析完毕，包含代码行%d." %(file_name,lines))
    return lines


#显示结果
def show_result(start_dir):
    lines=0
    total=0
    text=''

    for i in source_list:
        lines=source_list[i]
        total+=lines
        text+='%s源文件%d个，源代码%d行\n'%(i,file_list[i],lines )
    
    

    title='统计结果'
    msg='目前代码行数：%d\n成功啦!'%(total)


    g.msgbox(msg,title,text)
    
    # print(msg,title,text)




target=['.py','.java','.c','.h','.cpp','.js','.vue','.css']  #定义需要查找的源文件类型
file_list={}
source_list={}
g.msgbox('请打开您的文件夹','统计代码量')
path=g.diropenbox('请选择您的代码库：')
# print('请打开您的文件夹','统计代码量')
# path=input('请选择您的代码库：')

find_file(path,target)

show_result(path)
# print('Running time: %s Seconds'%(end-start))
