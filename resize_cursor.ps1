Add-Type -AssemblyName System.Drawing

$sourcePath = "assets\cursor.png"
$destPath = "assets\cursor_small.png"
$targetSize = 32

$image = [System.Drawing.Image]::FromFile($sourcePath)
$newImage = new-object System.Drawing.Bitmap $targetSize, $targetSize
$graphics = [System.Drawing.Graphics]::FromImage($newImage)
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

$graphics.DrawImage($image, 0, 0, $targetSize, $targetSize)
$newImage.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)

$image.Dispose()
$newImage.Dispose()
$graphics.Dispose()
Write-Host "Resized image saved to $destPath"
