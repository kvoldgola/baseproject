cd C:\baseproject\base\
expand -n32 -v1
copy C:\baseproject\base\list_bigtick.tex C:\baseproject\base\1526594268885.tex
copy C:\baseproject\base\list_ans.tex C:\baseproject\base\1526594268885_ans.tex
copy C:\baseproject\base\list_exam.tex C:\baseproject\base\1526594268885_exam.tex
pdflatex C:\baseproject\base\1526594268885.tex
pdflatex C:\baseproject\base\1526594268885_ans.tex
pdflatex C:\baseproject\base\1526594268885_exam.tex
copy c:\baseproject\base\1526594268885.pdf C:\baseproject\xtex\pdfs\
copy c:\baseproject\base\1526594268885_ans.pdf C:\baseproject\xtex\pdfs\
copy c:\baseproject\base\1526594268885_exam.pdf C:\baseproject\xtex\pdfs\
