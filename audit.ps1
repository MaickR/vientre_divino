Add-Type -AssemblyName System.Web
$files = @("index.html", "index-en.html")
foreach ($file in $files) {
    if (-not (Test-Path $file)) { Write-Host "$file not found"; continue }
    Write-Host "--- Audit for $file ---"
    $content = Get-Content $file -Raw
    $lines = Get-Content $file
    
    $ids = [regex]::Matches($content, 'id="([^"]+)"') | ForEach-Object { $_.Groups[1].Value }
    Write-Host "IDs found ($($ids.Count)): $($ids -join ', ')"
    
    $hrefMatches = [regex]::Matches($content, 'href="([^"]+)"')
    foreach ($match in $hrefMatches) {
        $href = $match.Groups[1].Value
        $foundLine = -1
        for ($i=0; $i -lt $lines.Length; $i++) {
            if ($lines[$i].Contains($match.Value)) { $foundLine = $i + 1; break }
        }
        
        if ($href.StartsWith("#") -and $href.Length -gt 1) {
            $targetId = $href.Substring(1)
            if ($ids -notcontains $targetId) {
                Write-Host "Error: Broken internal link '$href' at line $foundLine"
            }
        } elseif ($href -like "*wa.me*") {
            $text = "No text param"
            if ($href -match "text=([^&]+)") { 
                try {
                    $text = [System.Web.HttpUtility]::UrlDecode($matches[1]) 
                } catch { $text = "Decode Error" }
            }
            Write-Host ("WhatsApp at line " + $foundLine + ": " + $text)
        } elseif ($href -notmatch "^(http|mailto|tel|#|https)" -and $href.Trim() -ne "") {
            $cleanPath = $href.Split('#')[0].Split('?')[0]
            if (-not (Test-Path $cleanPath)) {
                Write-Host "Error: Local file not found '$href' at line $foundLine"
            }
        }
    }
    Write-Host ""
}
