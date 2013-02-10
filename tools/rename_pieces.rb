#!/usr/bin/env ruby
#
# Rename all files in directory "pieceN.EXTENSION"
#

i = -1
Dir.glob('./*').each do |f| 
File.rename(f, "piece#{i+=1}#{File.extname(f)}")
end



