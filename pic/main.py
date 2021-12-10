
import requests, time, re
from fake_useragent import UserAgent
from lxml import etree
import os


def ua():
    ua = UserAgent()
    headers = {"User-Agent": ua.random}
    return headers


def get_urllist():
    url = "https://psycho-tests.com/test/raven-matrixes-test"
    response = requests.get(url, headers=ua(), timeout=8).content.decode('utf-8')
    req = etree.HTML(response)
    hrefs = req.xpath('//b[@class="data-import-preserve"]/a/@href')
    print(len(hrefs))
    return hrefs


def get_imgs(url):
    response = requests.get(url, headers=ua(), timeout=8).content.decode('utf-8')
    time.sleep(1)
    req = etree.HTML(response)
    title = req.xpath('//title/text()')[0]
    title = re.sub(r'[\|\/\<\>\:\*\?\\\"]', "_", title)  # 剔除不合法字符
    print(title)
    os.makedirs(f'{title}/', exist_ok=True)  # 创建目录
    imgs = req.xpath('//figure[@class="data-import-preserve"]/img/@src')
    print(len(imgs))
    i = 1
    for img in imgs:
        img_url = img
        img_name = f'{i}.jpeg'
        bctp(title, img_url, img_name)
        i = i + 1


# 下载图片
def bctp(lj, img_url, img_name):
    print("开始下载图片！")
    try:
        r = requests.get(img_url, headers=ua(), timeout=5)
        with open(f'{lj}/{img_name}', 'wb') as f:
            f.write(r.content)
            print(f'下载{img_name}图片成功！')
            time.sleep(1)
    except Exception as e:
        if "port=443): Read timed out" in str(e):
            time.sleep(2)
            try:
                r = requests.get(img_url, headers=ua(), timeout=5)
                with open(f'{lj}/{img_name}', 'wb') as f:
                    f.write(r.content)
                    print(f'下载{img_name}图片成功！')
            except Exception as e:
                print(f'下载{img_name}图片失败！')
                print(f'错误代码：{e}')
                with open(f'{lj}/spider.txt', 'a+', encoding='utf-8') as f:
                    f.write(f'错误代码：{e}---下载 {img_url} 图片失败\n')
        else:
            print(f'下载{img_name}图片失败！')
            print(f'错误代码：{e}')
            with open(f'{lj}/spider.txt', 'a+', encoding='utf-8') as f:
                f.write(f'错误代码：{e}---下载 {img_url} 图片失败\n')


def run():
    hrefs = get_urllist()
    hrefs.remove("https://thedieline.com/blog/2020/5/6/-riceman")
    hrefs.remove("https://thedieline.com/blog/2020/3/6/srisangdao-rices-packaging-can-be-reused-as-tissue-box")
    hrefs.remove("https://thedieline.com/blog/2020/2/1/-revitalising-kelloggs")
    print(len(hrefs))
    for href in hrefs:
        if "https://thedieline.com" in href:
            print(f'>>>正在爬取{href}，采集中...')
            try:
                get_imgs(href)
            except:
                pass

    print(f'>>>采集完成！.')


if __name__ == '__main__':
    run()

